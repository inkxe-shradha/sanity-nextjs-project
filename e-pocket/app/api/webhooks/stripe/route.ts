import { client, writeClient } from '@/sanity/client';
import { ORDER_EXISTS_BY_STRIPE_PAYMENT_ID_QUERY } from '@/sanity/queries/orders.query';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const payload = await request.text();
  const headerList = await headers();
  const signature =
    headerList.get('Stripe-Signature') ||
    headerList.get('stripe-signature') ||
    '';

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Stripe signature' },
      { status: 400 },
    );
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  // * Handel the events
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }
  return NextResponse.json({ received: true });
}

/**
 * Handles the Stripe `checkout.session.completed` webhook event.
 *
 * This function processes a completed Stripe Checkout session by:
 * - Checking if an order with the given Stripe payment ID already exists to prevent duplicate processing.
 * - Extracting necessary metadata (such as user and product information) from the session.
 * - Fetching line items from Stripe to determine purchased products and their quantities.
 * - Creating a new order in the Sanity CMS, including customer reference, order items, total amount, and shipping address.
 * - Generating a unique order number for the new order.
 * - Decreasing the stock for each purchased product in a single transaction.
 * - Logging key actions and errors for debugging and monitoring.
 *
 * Throws an error if any step fails, which will result in a 500 response and trigger Stripe to retry the webhook.
 *
 * @param session - The Stripe Checkout Session object representing the completed payment.
 * @returns A promise that resolves when the order is processed and stock is updated, or early returns if the order already exists or required metadata is missing.
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const stripePaymentId = session.payment_intent as string;

  // Implement your logic to handle the completed checkout session
  console.log('Checkout session completed:', session.id);
  // For example, you might want to fulfill the order, update your database, etc.
  try {
    const exitingOrder = await client.fetch(
      ORDER_EXISTS_BY_STRIPE_PAYMENT_ID_QUERY,
      {
        stripePaymentId,
      },
    );
    if (exitingOrder) {
      console.log(
        `Webhook already processed for payment ${stripePaymentId}, skipping`,
      );
      return;
    }

    //* Extract the meta data
    const {
      clerkUserId,
      userEmail,
      sanityCustomerId,
      productIds: productIdsString,
      quantities: quantitiesString,
    } = session.metadata ?? {};
    if (!clerkUserId || !productIdsString || !quantitiesString) {
      console.error('Missing metadata in the session');
      return;
    }
    const productIds = productIdsString.split(',');
    const quantities = quantitiesString.split(',').map((q) => parseInt(q, 10));
    // * Get the line items form the stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    //  * Build the order items for the stripe
    const orderItems = productIds.map((productId, index) => ({
      _key: `item-${index}`,
      product: {
        _type: 'reference' as const,
        _ref: productId,
      },
      quantity: quantities[index],
      priceAtPurchase: lineItems.data[index]?.amount_total
        ? lineItems.data[index].amount_total / 100
        : 0,
    }));

    // * Generate the order number
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    // * Extract shipping address
    const shippingAddress = session.customer_details?.address;
    const address = shippingAddress
      ? {
          name: session.customer_details?.name ?? '',
          line1: shippingAddress.line1 ?? '',
          line2: shippingAddress.line2 ?? '',
          city: shippingAddress.city ?? '',
          postcode: shippingAddress.postal_code ?? '',
          country: shippingAddress.country ?? '',
        }
      : undefined;

    // * Create order in Sanity with customer reference
    const order = await writeClient.create({
      _type: 'order',
      orderNumber,
      ...(sanityCustomerId && {
        customer: {
          _type: 'reference',
          _ref: sanityCustomerId,
        },
      }),
      clerkUserId,
      email: userEmail ?? session.customer_details?.email ?? '',
      items: orderItems,
      total: (session.amount_total ?? 0) / 100,
      status: 'paid',
      stripePaymentId,
      address,
      createdAt: new Date().toISOString(),
    });
    console.log(`Order created: ${order._id} (${orderNumber})`);
    // Decrease stock for all products in a single transaction
    await productIds
      .reduce(
        (tx, productId, i) =>
          tx.patch(productId, (p) => p.dec({ stock: quantities[i] })),
        writeClient.transaction(),
      )
      .commit();

    console.log(`Stock updated for ${productIds.length} products`);
  } catch (error) {
    console.error('Error handling checkout.session.completed:', error);
    throw error; // Re-throw to return 500 and trigger Stripe retry
  }
}

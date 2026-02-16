'use server';

import Stripe from 'stripe';
import { client } from '@/sanity/lib/client';
import { CUSTOMERS_BY_EMAIL_QUERY } from '@/sanity/queries/customer.query';
import { writeClient } from '@/sanity/client';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
});

/**
 * * Retrieves an existing Stripe customer linked to the Sanity user
 * * or creates a new one if none exists.
 */
export async function getOrCreateStripeCustomer(
  name: string,
  email: string,
  clerkUserId: string,
) {
  // * First, check if customer already exists in Sanity
  const existingCustomer = await client.fetch(CUSTOMERS_BY_EMAIL_QUERY, {
    email,
  });

  if (existingCustomer?.stripeCustomerId) {
    // * Customer exists, return existing IDs
    return {
      stripeCustomerId: existingCustomer.stripeCustomerId,
      sanityCustomerId: existingCustomer._id,
    };
  }

  // * Check if customer exists in Stripe by email
  const existingStripeCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  let stripeCustomerId: string;

  if (existingStripeCustomers.data.length > 0) {
    // * Customer exists in Stripe
    stripeCustomerId = existingStripeCustomers.data[0].id;
  } else {
    // * Create new Stripe customer
    const newStripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        clerkUserId,
      },
    });
    stripeCustomerId = newStripeCustomer.id;
  }

  // * Create or update customer in Sanity
  if (existingCustomer) {
    // * Update existing Sanity customer with Stripe ID
    await writeClient
      .patch(existingCustomer._id)
      .set({ stripeCustomerId, clerkUserId, name })
      .commit();
    return {
      stripeCustomerId,
      sanityCustomerId: existingCustomer._id,
    };
  }

  // Create new customer in Sanity
  const newSanityCustomer = await writeClient.create({
    _type: 'customer',
    email,
    name,
    clerkUserId,
    stripeCustomerId,
    createdAt: new Date().toISOString(),
  });

  return {
    stripeCustomerId,
    sanityCustomerId: newSanityCustomer._id,
  };
}

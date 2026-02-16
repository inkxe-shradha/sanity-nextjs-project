import { defineQuery } from 'next-sanity';

/**
 * * Get all orders by the clerk user ID
 * use on the orders listing page
 */

export const ORDERS_BY_CLERK_USER_ID_QUERY =
  defineQuery(`*[_type == "order" && clerkUserId == $clerkUserId] | order(createdAt desc) {
  _id,
    orderNumber,
    total,
    status,
    createdAt,
    "itemCount": count(items),
    "itemNames": items[].product->name,
    "itemImages": items[].product->images[0].asset->url,
  }`);

/**
 * * Get the single order by the ID with the full details
 * Used on the order details page
 */
export const ORDER_BY_ID_QUERY =
  defineQuery(`*[_type == "order" && _id == $id][0] {
  _id,
    orderNumber,
    clerkUserId,
    email,
    items[] {
    _key,
    quantity,
    priceAtPurchase,
    product-> {
      _id,
      name,
      "slug": slug.current,
      "image": images[0] {
        asset-> {
            _id,
            url
        }
      }
    },
    },
    total,
    status,
    address {
        name, line1, line2, city, state, postcode, country
    },
    createdAt,
    stripePaymentId,

}`);

// * Get all recent orders (For the admin dashboard)
export const RECENT_ORDERS_QUERY =
  defineQuery(`*[_type == "order"] | order(createdAt desc)[0...$limit] {
    _id,
    orderNumber,
    email,
    total,
    status,
    createdAt,
}`);

// * Check if the order exists by the stripe payment ID + Used for the webhook check
export const ORDER_EXISTS_BY_STRIPE_PAYMENT_ID_QUERY =
  defineQuery(`*[_type == "order" && stripePaymentId == $stripePaymentId][0] {
    _id
}`);

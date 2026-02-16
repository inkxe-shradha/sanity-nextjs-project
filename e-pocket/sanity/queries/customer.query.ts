import { defineQuery } from 'next-sanity';

export const CUSTOMERS_BY_EMAIL_QUERY =
  defineQuery(`*[_type == "customer" && email == $email][0] {
  _id,
  name,
  clerkUserId,
  stripeCustomerId,
  email,
  createdAt,
}`);

export const CUSTOMERS_BY_STRIPE_ID_QUERY =
  defineQuery(`*[_type == "customer" && stripeCustomerId == $stripeCustomerId][0] {
    _id,
    name,
    clerkUserId,
    stripeCustomerId,
    email,
    createdAt,
}`);

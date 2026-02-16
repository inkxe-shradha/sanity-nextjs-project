import { defineQuery } from 'next-sanity';

// * Get the total Products count for status overview
export const TOTAL_PRODUCTS_COUNT_QUERY = defineQuery(
  `count(*[_type == "product"])`,
);

// * Get the total Orders count for status overview
export const TOTAL_ORDERS_COUNT_QUERY = defineQuery(
  `count(*[_type == "order"])`,
);

// * Get the total revenue form the completed Orders
export const TOTAL_REVENUE_QUERY = defineQuery(
  `math::sum(*[_type == "order" && status in ["paid", "shipped", "delivered"]].total)`,
);

// ============================================
// AI Insights Analytics Queries
// ============================================

/**
 * * Get orders from the last 7 days with details
 * Excludes draft documents
 */
export const ORDERS_LAST_7_DAYS_QUERY = defineQuery(`*[
  _type == "order"
  && createdAt >= $startDate
  && !(_id in path("drafts.**"))
] | order(createdAt desc) {
  _id,
  orderNumber,
  total,
  status,
  createdAt,
  "itemCount": count(items),
  items[]{
    quantity,
    priceAtPurchase,
    "productName": product->name,
    "productId": product->_id
  }
}`);

//  * Get the order status distribution for AI Insights analytics
export const ORDER_STATUS_DISTRIBUTION_QUERY = defineQuery(`{
        "paid": count(*[_type == "order" && status == "paid" && !(_id in path("drafts.**"))]),
        "shipped": count(*[_type == "order" && status == "shipped" && !(_id in path("drafts.**"))]),
        "delivered": count(*[_type == "order" && status == "delivered" && !(_id in path("drafts.**"))]),
        "cancelled": count(*[_type == "order" && status == "cancelled" && !(_id in path("drafts.**"))])
    }`);

// * Get the product by the quantity sold for AI Insights analytics
export const TOP_SOLD_PRODUCTS_QUERY = defineQuery(`
    *[_type == "order" && status in ["paid", "shipped", "delivered"] && !(_id in path("drafts.**"))] {
         items[]{
            "productId": product->_id,
            "productName": product->name,
            "productPrice": product->price,
            quantity
        }
    }.items[]`);

// * Get all the Product with the Stock and Sales data for the inventory analytics
export const PRODUCT_INVENTORY_ANALYTICS_QUERY =
  defineQuery(`*[_type == "product"] {
  _id,
  name,
  price,
  stock,
  "category": category->title
}`);

/**
 * * Get unfulfilled orders (paid but not yet shipped)
 *  ! Excludes draft documents to get accurate counts
 */
export const UNFULFILLED_ORDERS_QUERY = defineQuery(`*[
  _type == "order"
  && status == "paid" && !(_id in path("drafts.**"))
] | order(createdAt asc) {
   _id,
  orderNumber,
  total,
  createdAt,
  email,
  "itemCount": count(items)
}`);

/**
 * * Get revenue comparison data (current vs previous period)
 *  ! Excludes draft documents
 */

export const REVENUE_COMPARISON_QUERY = defineQuery(`{
  "currentPeriod": math::sum(*[
    _type == "order"
    && status in ["paid", "shipped", "delivered"]
    && createdAt >= $currentStart
    && !(_id in path("drafts.**"))
  ].total),
  "previousPeriod": math::sum(*[
    _type == "order"
    && status in ["paid", "shipped", "delivered"]
    && createdAt >= $previousStart
    && createdAt < $currentStart
    && !(_id in path("drafts.**"))
  ].total),
  "currentOrderCount": count(*[
    _type == "order"
    && createdAt >= $currentStart
    && !(_id in path("drafts.**"))
  ]),
  "previousOrderCount": count(*[
    _type == "order"
    && createdAt >= $previousStart
    && createdAt < $currentStart
    && !(_id in path("drafts.**"))
  ])
}`);

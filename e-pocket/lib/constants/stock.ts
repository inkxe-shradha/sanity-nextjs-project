/**
 * * Stock Thrshold for the low stock warnings.
 * * @constant {number} LOW_STOCK_THRESHOLD
 */
export const LOW_STOCK_THRESHOLD = 5;

/**
 * * Check if a product is considered low in stock.
 * @param {number} stock - The current stock level of the product.
 *  @returns {boolean} - Returns true if the stock is less than or equal to the low stock threshold.
 */

export function isLowStock(stock: number): boolean {
  return stock <= LOW_STOCK_THRESHOLD;
}

/**
 * * Check if a product is out of stock
 * @param stock - Current stock count
 * @returns true if stock is 0 or less
 */
export function isOutOfStock(stock: number): boolean {
  return stock <= 0;
}

/**
 * * Get the stock status of a product
 * @param stock - Current stock count
 * @returns 'in-stock', 'low-stock', or 'out-of-stock'
 */
export const getStockStatus = (
  stock: number | null | undefined,
): 'in-stock' | 'low-stock' | 'out-of-stock' | 'unknown' => {
  if (stock === null || stock === undefined) {
    return 'unknown';
  }
  if (isOutOfStock(stock)) {
    return 'out-of-stock';
  }
  if (isLowStock(stock)) {
    return 'low-stock';
  }
  return 'in-stock';
};

/**
 * * * Get a human-readable label for the stock status
 * @param status - Stock status
 * @returns 'In Stock', 'Low Stock', 'Out of Stock', or 'Unknown'
 */
export const getStockStatusLabel = (
  status:
    | number
    | null
    | undefined
    | 'in-stock'
    | 'low-stock'
    | 'out-of-stock'
    | 'unknown',
): string => {
  let stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock' | 'unknown';
  let isNumber = false;
  if (typeof status === 'number' || status === null || status === undefined) {
    stockStatus = getStockStatus(status);
    isNumber = true;
  } else {
    stockStatus = status;
  }
  switch (stockStatus) {
    case 'out-of-stock':
      return 'OUT OF STOCK - Currently unavailable';
    case 'low-stock':
      return isNumber ? `LOW STOCK - Only ${status} left` : 'LOW STOCK';
    case 'in-stock':
      return isNumber ? `In stock (${status} available)` : 'In stock';
    default:
      return 'Stock status unknown';
  }
};

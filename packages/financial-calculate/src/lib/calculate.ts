import {createLogger} from '@alwatr/logger';

const logger = createLogger(__package_name__);

/**
 * Calculate the price after applying a discount.
 *
 * @param price - The original price.
 * @param discount - The discount percentage to apply.
 * @param decimal - The number of decimal places to round to (default is 2).
 * @example
 * // with default decimal
 * calculateDiscountedPrice(100, 10); // returns 90.00
 *
 * // with incoming decimal
 * calculateDiscountedPrice(95, 10, 1); // returns 85.50
 */
export function calculateDiscountedPrice (price: number, discount: number, decimal = 2): number  {
  logger.logMethodArgs?.('calculateDiscountedPrice', {price, discount, decimal});
  const factor = Math.pow(10, decimal);
  return Math.round(price * (1 - discount / 100) * factor) / factor;
}

/**
 * Calculate the discount amount from the original price.
 *
 * @param price - The original price.
 * @param discount - The discount percentage.
 * @param decimal - The number of decimal places to round to (default is 2).
 * @example
 * // with default decimal
 * computeDiscountFromPrice(100, 10); // returns 10.00
 *
 * // with incoming decimal
 * computeDiscountFromPrice(95, 10, 1); // returns 9.50
 */
export function computeDiscountFromPrice(price: number, discount: number, decimal = 2): number {
  logger.logMethodArgs?.('computeDiscountFromPrice', {price, discount, decimal});
  const factor = Math.pow(10, decimal);
  return Math.round(((price * discount) / 100) * factor) / factor;
}

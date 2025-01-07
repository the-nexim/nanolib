import {createLogger} from '@alwatr/logger';

const logger = createLogger(__package_name__);

/**
 * Calculate the price after applying a discount.
 *
 * @param {number} price - The original price.
 * @param {number} discount - The discount percentage to apply.
 * @param {number} [decimal=2] - The number of decimal places to round to.
 * @example
 * // with default decimal
 * calcPriceFromDiscount(100, 10); // returns 90.00
 *
 * // with incoming decimal
 * calcPriceFromDiscount(95, 10, 1); // returns 85.50
 */
export const calcPriceFromDiscount = (price: number, discount: number, decimal = 2): number => {
  logger.logMethodArgs?.('calcPriceFromDiscount', {price, discount, decimal});
  const factor = Math.pow(10, decimal);
  return Math.round(price * (1 - discount / 100) * factor) / factor;
};

/**
 * Calculate the discount amount from the original price.
 *
 * @param {number} price - The original price.
 * @param {number} discount - The discount percentage.
 * @param {number} [decimal=2] - The number of decimal places to round to.
 * @example
 * // with default decimal
 * calcDiscountPrice(100, 10); // returns 10.00
 *
* // with incoming decimal
 * calcDiscountPrice(95, 10, 1); // returns 9.50
 */
export function calcDiscountFromPrice(price: number, discount: number, decimal = 2): number {
  logger.logMethodArgs?.('calcDiscountPrice', {price, discount, decimal});
  const factor = Math.pow(10, decimal);
  return Math.round(((price * discount) / 100) * factor) / factor;
}

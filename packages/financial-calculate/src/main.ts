import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger = createLogger(__package_name__);

/**
 * Calculate the price after applying a discount.
 *
 * @param price - The original price.
 * @param discount - The discount percentage to apply.
 * @param decimal - The number of decimal places to round to (default is 2).
 *
 * @example
 * ```
 * calculateDiscountedPrice(100, 10, 1); // returns 90.0
 * ```
 */
export function calculateDiscountedPrice(price: number, discount: number, decimal = 2): number {
  logger.logMethodArgs?.('calculateDiscountedPrice', {price, discount, decimal});

  const discountedPrice = price * (1 - discount / 100);
  return parseFloat(discountedPrice.toFixed(decimal));
}

/**
 * Calculate the discount amount from the original price.
 *
 * @param price - The original price.
 * @param discount - The discount percentage.
 * @param decimal - The number of decimal places to round to (default is 2).
 *
 * @example
 * ```
 * calculateDiscountAmount(100, 10, 1); // returns 10.0
 * ```
 */
export function calculateDiscountAmount(price: number, discount: number, decimal = 2): number {
  logger.logMethodArgs?.('calculateDiscountAmount', {price, discount, decimal});

  const discountAmount = (price * discount) / 100;
  return parseFloat(discountAmount.toFixed(decimal));
}

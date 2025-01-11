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

/**
 * Calculates the discount percentage between the market price and the sale price for profit.
 *
 * @param marketPrice - The original market price of the item.
 * @param salePrice - The sale price of the item.
 * @param decimal - The number of decimal places to round the result to(optional with default value = 2).
 * @param upSide - Determines the denominator for the percentage calculation (optional with default value = true).
 *
 * @example
 * ```
 * calculateDiscountPercentage(100, 80); // Returns 20.00
 * calculateDiscountPercentage(100, 80, 1, false); // Returns 25.0
 * ```
 */
export function calculateDiscountPercentageProfit(marketPrice: number, salePrice: number, decimal = 2): number {
  logger.logMethodArgs?.('calculateDiscountedPrice', {marketPrice, salePrice, decimal});

  if ([marketPrice, salePrice, decimal].some(value => isNaN(value)) || decimal < 0) {
    logger.error?.('calculateDiscountPercentage', 'some of the input values is not a number');
    return 0
  }

  const percentage = ((marketPrice - salePrice) / salePrice) * 100;
  return parseFloat(percentage.toFixed(decimal));
}

/**
 * Calculates the discount percentage between the market price and the sale price for discount.
 *
 * @param marketPrice - The original market price of the item.
 * @param salePrice - The sale price of the item.
 * @param decimal - The number of decimal places to round the result to(optional with default value = 2).
 * @param upSide - Determines the denominator for the percentage calculation (optional with default value = true).
 *
 * @example
 * ```
 * calculateDiscountPercentage(100, 80); // Returns 20.00
 * calculateDiscountPercentage(100, 80, 1, false); // Returns 25.0
 * ```
 */
export function calculateDiscountPercentageDiscount(marketPrice: number, salePrice: number, decimal = 2): number {
  logger.logMethodArgs?.('calculateDiscountedPrice', {marketPrice, salePrice, decimal});

  if ([marketPrice, salePrice, decimal].some(value => isNaN(value)) || decimal < 0) {
    logger.error?.('calculateDiscountPercentage', 'some of the input values is not a number');
    return 0
  }

  const percentage = ((marketPrice - salePrice) / marketPrice) * 100;
  return parseFloat(percentage.toFixed(decimal));
}

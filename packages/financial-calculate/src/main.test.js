import test from 'ava';

import {calculateDiscountAmount, calculateDiscountedPrice,calculateDiscountPercentageDiscount, calculateDiscountPercentageProfit} from '@nexim/financial-calculate';

test('calculate discount from price with: 3, 4 input', (test) => {
  test.is(calculateDiscountAmount(3, 4), 0.12);
  test.is(calculateDiscountAmount(100, 10), 10);
  test.is(calculateDiscountAmount(587, 629), 3692.23);
  test.is(calculateDiscountAmount(15034, 73), 10974.82);
  test.is(calculateDiscountAmount(54205, 1332, 5), 722010.6);
});
test('calculate price from discount with: 3, 4 input', (test) => {
  test.is(calculateDiscountedPrice(3, 4), 2.88);
  test.is(calculateDiscountedPrice(15034, 73), 4059.18);
  test.is(calculateDiscountedPrice(587, 629), -3105.23);
  test.is(calculateDiscountedPrice(54205, 1332, 5), -667805.6);
});

test('calculate discount percentage for profit and discount', (test) => {
  test.is(calculateDiscountPercentageProfit(100, 80), 25);
  test.is(calculateDiscountPercentageProfit(100, 53), 88.68);

  test.is(calculateDiscountPercentageDiscount(100, 80, 1), 20);
  test.is(calculateDiscountPercentageDiscount(100, 53), 47);
});

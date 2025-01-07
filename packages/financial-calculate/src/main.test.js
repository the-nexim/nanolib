import test from 'ava';
import { calcDiscountFromPrice, calcPriceFromDiscount } from '@nexim/financial-calculate';

// empty test
test('empty test', (test) => {
  test.pass();
});

test('calculate discount from price', (test) => {
  test.is(calcDiscountFromPrice(3, 4), 0.12);
})

test('calculate price from discount', (test) => {
  test.is(calcPriceFromDiscount(3, 4), 2.88);
})

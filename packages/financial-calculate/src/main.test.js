import test from 'ava';

import {computeDiscountFromPrice, calculateDiscountedPrice} from '@nexim/financial-calculate';

// empty test
test('empty test', (test) => {
  test.pass();
});

test('calculate discount from price with: 3, 4 input', (test) => {
  test.is(computeDiscountFromPrice(3, 4), 0.12);
});

test('calculate price from discount with: 3, 4 input', (test) => {
  test.is(calculateDiscountedPrice(3, 4), 2.88);
});

test('calculate discount from price with: 587, 629 input', (test) => {
  test.is(computeDiscountFromPrice(587, 629), 3692.23);
});

test('calculate price from discount with: 587, 629 input', (test) => {
  test.is(calculateDiscountedPrice(587, 629), -3105.23);
});

test('calculate discount from price with: 15034, 73 input', (test) => {
  test.is(computeDiscountFromPrice(15034, 73), 10974.82);
});

test('calculate price from discount with: 15034, 73 input', (test) => {
  test.is(calculateDiscountedPrice(15034, 73), 4059.18);
});

test('calculate discount from price with: 54205, 1332, 5 input', (test) => {
  test.is(computeDiscountFromPrice(54205, 1332, 5), 722010.6);
});

test('calculate price from discount with: 54205, 1332, 5 input', (test) => {
  test.is(calculateDiscountedPrice(54205, 1332, 5), -667805.6);
});

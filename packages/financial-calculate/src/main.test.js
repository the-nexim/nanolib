import test from 'ava';

import {calculateDiscountAmount, calculateDiscountedPrice, calculateDiscountPercentage} from '@nexim/financial-calculate';

test('calculate discount from price with: 3, 4 input', (test) => {
  test.is(calculateDiscountAmount(3, 4), 0.12);
});

test('calculateDiscountAmount(100, 10) returns 10.00', (t) => {
  t.is(calculateDiscountAmount(100, 10), 10);
});

test('calculate price from discount with: 3, 4 input', (test) => {
  test.is(calculateDiscountedPrice(3, 4), 2.88);
});

test('calculate discount from price with: 587, 629 input', (test) => {
  test.is(calculateDiscountAmount(587, 629), 3692.23);
});

test('calculate price from discount with: 587, 629 input', (test) => {
  test.is(calculateDiscountedPrice(587, 629), -3105.23);
});

test('calculate discount from price with: 15034, 73 input', (test) => {
  test.is(calculateDiscountAmount(15034, 73), 10974.82);
});

test('calculate price from discount with: 15034, 73 input', (test) => {
  test.is(calculateDiscountedPrice(15034, 73), 4059.18);
});

test('calculate discount from price with: 54205, 1332, 5 input', (test) => {
  test.is(calculateDiscountAmount(54205, 1332, 5), 722010.6);
});

test('calculate price from discount with: 54205, 1332, 5 input', (test) => {
  test.is(calculateDiscountedPrice(54205, 1332, 5), -667805.6);
});

test('calculate discount percentage', (test) => {
  test.is(calculateDiscountPercentage(100, 80), 25); // upSide = true (default)
  test.is(calculateDiscountPercentage(100, 80, 1, false), 20); // upSide = false
  test.is(calculateDiscountPercentage(100, 80, 1, true), 25); // Explicit upSide = true
});

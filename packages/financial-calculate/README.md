# @nexim/financial-calculate

![NPM Version](https://img.shields.io/npm/v/@nexim/financial-calculate)
![npm bundle size](https://img.shields.io/bundlephobia/min/@nexim/financial-calculate)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/financial-calculate)
![NPM License](https://img.shields.io/npm/l/@nexim/financial-calculate)

Provides a set of utils to handle common financial operations.

## Installation

To install the package, use npm or yarn:

```sh
npm install @nexim/financial-calculate

# Or using yarn
yarn add @nexim/financial-calculate
```

## API

### calculateDiscountedPrice

Calculate the price after applying a discount.

```ts
calculateDiscountedPrice(100, 10, 1); // returns 90.0
```

### calculateDiscountAmount

Calculate the discount amount from the original price.

```ts
calculateDiscountAmount(100, 10, 1); // returns 10.0
```

### calculateDiscountPercentage

Calculates the discount percentage between the market price and the sale price.

```ts
calculateDiscountPercentage(100, 80); // Returns 20.00
calculateDiscountPercentage(100, 80, 1, false); // Returns 25.0
```

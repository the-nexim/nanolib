# @nexim/financial-calculate

![NPM Version](https://img.shields.io/npm/v/@nexim/financial-calculate)
![npm bundle size](https://img.shields.io/bundlephobia/min/@nexim/financial-calculate)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/financial-calculate)
![NPM License](https://img.shields.io/npm/l/@nexim/financial-calculate)

## Overview

a library for performing various financial calculations. It provides a set of functions to handle common financial operations such as interest calculations, loan payments, and more.

## Installation

To install the package, use npm or yarn:

```sh
npm install @nexim/financial-calculate

# Or using yarn
yarn add @nexim/financial-calculate
```

## Api

### calcPriceFromDiscount

Calculate the price after applying a discount.

```ts
// with default decimal
calcPriceFromDiscount(100, 10); // returns 90.00

// with incoming decimal
calcPriceFromDiscount(95, 10, 1); // returns 85.50
```

### calcDiscountPrice

Calculate the discount amount from the original price.

```ts
// with default decimal
calcDiscountPrice(100, 10); // returns 10.00
// with incoming decimal
calcDiscountPrice(95, 10, 1); // returns 9.50
```

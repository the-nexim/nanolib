# @nexim/alpine

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Falpine)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Falpine)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Falpine)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Falpine)

## Overview

`@nexim/alpine` is a versatile library designed to enhance your Alpine.js experience with a suite of utility functions and mixins. It provides robust solutions for data management, including logging capabilities and backup functionalities with local storage support. This library aims to streamline the development of high-performance projects, ensuring efficiency and scalability.

## Installation

Install the package using npm or yarn:

```sh
npm install @nexim/alpine

# Or using yarn
yarn add @nexim/alpine
```

## API

### alpineStoreGenerator

Generates an Alpine.js store with a default value.

```ts
import {alpineStoreGenerator} from '@nexim/alpine';

const store = alpineStoreGenerator({
  name: 'user',
  defaultValue: {type: 'root'},
});

console.log(store.type); // Output: root
```

### AlpineStoreWithBackup

Extends `AlpineStore` to add backup and restore functionality with local storage support and expiration handling.

```ts
import {AlpineStoreWithBackup} from '@nexim/alpine';

const storeWithBackup = new AlpineStoreWithBackup({
  name: 'myStoreWithBackup',
  version: 1,
  defaultValue: {data: null},
  expireDuration: '1d',
});
```

# @nexim/alpine

![NPM Version](https://img.shields.io/npm/v/@nexim/alpine)
![npm bundle size](https://img.shields.io/bundlephobia/min/@nexim/alpine)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/alpine)
![NPM License](https://img.shields.io/npm/l/@nexim/alpine)

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

#### Example Usage

```ts
import {alpineStoreGenerator} from '@nexim/alpine';

const store = alpineStoreGenerator({
  name: 'user',
  defaultValue: {type: 'root'},
});

console.log(store.type); // Output: root
```

### AlpineStore

Provides a Alpine.js pure store implementation with logger.

#### Constructor

Creates an instance of `AlpineStore`.

- **config**: The configuration object for the store.
  - **name**: The name of the store.
  - **defaultValue**: The default value of the store.

### Properties

- **store**: alpine store proxy.

#### Example Usage

```ts
import {AlpineStore} from '@nexim/alpine';

const {store} = new AlpineStore({
  name: 'myStore',
  defaultValue: {data: 'root'},
});

console.log(store.data); // Output: { data: 'root' }
store.data = 'user';

console.log(store.data); // Output: { data: 'user' }
```

### AlpineStoreWithBackup

Extends `AlpineStore` to add backup and restore functionality with local storage support and expiration handling.

#### Constructor

Creates an instance of `AlpineStoreWithBackup`.

- **config**: The configuration object for the store.
  - **name**: The name of the store.
  - **version**: The version of the store.
  - **defaultValue**: The default value of the store.
  - **expireDuration**: Optional. The duration after which the store expires.

### Properties

- **store**: alpine store proxy.

#### Methods

- **save()**: Saves the current data to local storage. If the data is null, it clears the stored data. Also updates the expiration time.
- **clear()**: Clears the local storage and set default value to store.

#### Example Usage

```ts
import {AlpineStoreWithBackup} from '@nexim/alpine';

const storeWithBackup = new AlpineStoreWithBackup({
  name: 'myStoreWithBackup',
  version: 1,
  defaultValue: {data: 'root'},
  expireDuration: '1d',
});

storeWithBackup.store.data = 'user';

storeWithBackup.save();
console.log(storeWithBackup.store.data); // Output: { data: 'user' }

storeWithBackup.clear();
console.log(storeWithBackup.store.data); // Output: { data: 'root' }
```

### TODO

- Analyze [@alwatr/context](https://github.com/Alwatr/flux/tree/next/packages/context) for use here.

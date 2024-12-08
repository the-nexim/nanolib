# @nexim/store

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Fstore)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Fstore)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Fstore)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Fstore)

## Overview

`@nexim/store` is a collection of utility functions and mixins for building high-performance, maintainable web components using Lit.

## Installation

```sh
npm install @nexim/store

# Or using yarn
yarn add @nexim/store
```

## API

### Store

The `Store` class provides a base store implementation with logging capabilities.

```ts
import { Store } from '@nexim/store';

const store = new Store({
  name: 'myStore',
  defaultStore: { key: 'value' }
});
```

### StoreWithBackup

The `StoreWithBackup` class extends `Store` to add backup and restore functionality with local storage support and expiration handling.

```ts
import { StoreWithBackup } from '@nexim/store';

const storeWithBackup = new StoreWithBackup({
  name: 'myStoreWithBackup',
  version: 1,
  defaultStore: { data: null },
  expireDuration: '1d'
});
```

### BaseStore

The `BaseStore` class is a base class for creating stores with Alpine.js state management.

```ts
import { BaseStore } from '@nexim/store';

const baseStore = new BaseStore({
  name: 'myBaseStore',
  defaultStore: { key: 'value' }
});
```

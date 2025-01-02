# @nexim/service-worker

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Fservice-worker)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Fservice-worker)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Fservice-worker)

## Overview

Utilities to simplify the usage of service workers in your web applications.

## Installation

Install the package using npm or yarn:

```sh
npm install @nexim/service-worker

# Or using yarn
yarn add @nexim/service-worker
```

## Api

### registerServiceWorker

Register the service worker and handle updates.

```ts
import {registerServiceWorker} from '@nexim/service-worker';

const serviceWorkerPath = '/service-worker.js';
registerServiceWorker(serviceWorkerPath);
```

### serviceWorkerSignal

Signal for service worker events.

```ts
import {serviceWorkerSignal} from '@nexim/service-worker';

serviceWorkerSignal.subscribe(({event}) => {
  console.log('Service worker event:', event);
});
```

### Type ServiceWorkerEvent

The events that can be emitted by the service worker.

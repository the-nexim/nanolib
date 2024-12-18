# @nexim/analytic

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Fanalytic)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Fanalytic)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Fanalytic)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Fanalytic)

## Overview

This package provides functions to set up Clarity Analytics and Google Analytics for your web application.

## Installation

Install the package using npm or yarn:

```sh
npm install @nexim/analytic

# Or using yarn
yarn add @nexim/analytic
```

## API

### setupClarityAnalytics

To set up Clarity Analytics, use the `setupClarityAnalytics` function.

```ts
import {setupClarityAnalytics} from '@nexim/analytic';

setupClarityAnalytics('your-clarity-tracking-id');
```

### loadGoogleAnalyticsScript

To set up Google Analytics, use the `loadGoogleAnalyticsScript` function.

```ts
import {loadGoogleAnalyticsScript} from '@nexim/analytic';

loadGoogleAnalyticsScript('your-google-analytics-tracking-id');
```

# @nexim/google-analytics

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Fgoogle-analytic)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Fgoogle-analytic)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Fgoogle-analytic)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Fgoogle-analytic)

## Overview

Simple google analytic setup functions.

## Installation

Install the package using npm or yarn:

```sh
npm install @nexim/google-analytics

# Or using yarn
yarn add @nexim/google-analytics
```

## API

### initializeGoogleAnalytics

Initialize google analytics with tracking id.

```ts
import {initializeGoogleAnalytics} from '@nexim/analytic';

initializeGoogleAnalytics('your-google-analytics-tracking-id');
```

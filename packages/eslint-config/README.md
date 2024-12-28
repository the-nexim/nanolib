# Nexim's ESLint Configurations

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Feslint-config)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Feslint-config)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Feslint-config)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Feslint-config)

## Overview

Alwatr ECMAScript Style Guide as a ESLint [shareable configurations](http://eslint.org/docs/developer-guide/shareable-configs.html).

## Installation

```bash
yarn add -D @nexim/eslint-config \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-import \
  eslint-import-resolver-typescript
```

## Usage

Create a `.eslintrc.json` file in the root of your project:

```json
{
  "extends": "@nexim/eslint-config",
  "rules": {
    // Additional, per-project rules...
  }
}
```

## Idea

It's possible to generate a full eslint json bundle in build time and use them in project to figure out changes.

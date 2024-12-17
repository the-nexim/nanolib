# Nexim TypeScript Config

![NPM Version](https://img.shields.io/npm/v/%40nexim%2Ftypescript-config)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40nexim%2Ftypescript-config)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/%40nexim%2Ftypescript-config)
![NPM License](https://img.shields.io/npm/l/%40nexim%2Ftypescript-config)

## Overview

This is a base TypeScript configuration for Nexim projects.

## installation

```bash
yarn add -D @nexim/typescript-config
```

## Usage

Create a `tsconfig.json` file in the root of your project:

```json
{
  "extends": "@nexim/typescript-config",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

# Nexim TypeScript Config

![NPM Version](https://img.shields.io/npm/v/@nexim/typescript-config)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/typescript-config)
![NPM License](https://img.shields.io/npm/l/@nexim/typescript-config)

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

# Nexim's ESLint Configurations

![NPM Version](https://img.shields.io/npm/v/@nexim/eslint-config)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/eslint-config)
![NPM License](https://img.shields.io/npm/l/@nexim/eslint-config)

Nexim ECMAScript Style Guide as a ESLint [shareable configurations](http://eslint.org/docs/developer-guide/shareable-configs.html).

## Installation

```bash
yarn add -D @nexim/eslint-config eslint @eslint/compat
```

## Usage

Create a `eslint.config.mjs` file in the root of your project:

```js
import { baseExtends, jsConfigs, tsConfig } from '@nexim/eslint-config';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

// pass gitignore file content as ignorePatterns
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, '.gitignore');
const ignorePatterns = includeIgnoreFile(gitignorePath).ignores;

// add your custom folders to ignore
ignorePatterns?.push('.yarn');

export default [
  ...baseExtends,
  ...tsConfig,
  ...jsConfigs,
  {
    ignores: ignorePatterns,
  },
];
```

Run ESLint:

```bash
eslint . --config eslint.config.mjs --cache
```

## Idea

It's possible to generate a full eslint json bundle in build time and use them in project to figure out changes.

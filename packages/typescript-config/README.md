# Nexim TypeScript Configuration

![NPM Version](https://img.shields.io/npm/v/@nexim/typescript-config)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/typescript-config)
![NPM License](https://img.shields.io/npm/l/@nexim/typescript-config)

This package provides pre-configured settings for using TypeScript in Nexim projects.

## Installation

Install the package as a development dependency:

```bash
yarn add -D @nexim/typescript-config
```

## Usage

To use this configuration, create a `tsconfig.json` file in the root of your project and extend one of the provided configurations:

### Base Configuration (`tsconfig.base.json`)

This configuration contains the fundamental settings shared by all other configurations. It's generally not used directly, but serves as the foundation for other, more specific configurations.

### Browser Application (`tsconfig.browser.app.json`)

Use this configuration for browser-based applications. It extends the base configuration and is primarily used for type checking during development. It doesn't produce build outputs.

```json
{
  "extends": "@nexim/typescript-config/tsconfig.browser.app.json",
  "include": ["src/**/*.ts", "src/*.ts"] // Include all TypeScript files in your source directory
}
```

### Browser Library (`tsconfig.browser.lib.json`)

Use this configuration for browser-based libraries. It extends the base configuration and generates type definition files (`*.d.ts`) in the `dist` folder. These type definitions allow other TypeScript projects to use your library with proper type checking.

```json
{
  "extends": "@nexim/typescript-config/tsconfig.browser.lib.json",
  "include": ["src/**/*.ts", "src/*.ts"] // Include all TypeScript files in your source directory
}
```

### Node.js Application (`tsconfig.node.app.json`)

Use this configuration for Node.js applications. It extends the base configuration and includes Node.js specific type definitions for accurate type checking during development. It doesn't produce build outputs.

```json
{
  "extends": "@nexim/typescript-config/tsconfig.node.app.json",
  "include": ["src/**/*.ts", "src/*.ts"] // Include all TypeScript files in your source directory
}
```

### Node.js Library (`tsconfig.node.lib.json`)

Use this configuration for Node.js libraries. It extends the base configuration, includes Node.js type definitions, and generates type definition files (`*.d.ts`) in the `dist` folder. These type definitions make it possible for other TypeScript projects to reference and use your library with type safety.

```json
{
  "extends": "@nexim/typescript-config/tsconfig.node.lib.json",
  "include": ["src/**/*.ts", "src/*.ts"] // Include all TypeScript files in your source directory
}
```

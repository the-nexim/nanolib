# Nexim's ESLint Configurations

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

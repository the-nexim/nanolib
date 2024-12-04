# Nexim TypeScript Config

This is a base TypeScript configuration for Nexim projects.

## installation

```bash
yarn add -D @nexim/tsconfig-base
```

## Usage

Create a `tsconfig.json` file in the root of your project:

```json
{
  "extends": "@nexim/tsconfig-base",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

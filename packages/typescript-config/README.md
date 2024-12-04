# Nexim TypeScript Config

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

import * as globals from 'globals';
import tseslint from 'typescript-eslint';

export const jsConfigs = tseslint.config({
  extends: [ tseslint.configs.disableTypeChecked ],
  files: [ '*.{mjs,js,cjs}', '**/*.{mjs,js,cjs}' ],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    globals: {
      ...globals.commonjs,
      ...globals.node,
    },
    sourceType: 'commonjs',
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
});

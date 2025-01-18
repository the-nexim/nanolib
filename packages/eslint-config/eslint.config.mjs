import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {files: ['*.ts','*.cjs', '*.mjs', '*.js']},
  {
    languageOptions: {
      globals: {...globals['shared-node-browser'],...globals['commonjs']},
      ecmaVersion: 'latest',
      sourceType: ['module', "commonjs"],
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwatysTryTypes: true,
          ecmaVersion: 'latest',
        },
        node: true,
      },
      'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/*.config.js', '.prettierignore'],
    rules: {
      'max-len': ['error', {code: 140}],
      'no-eval': ['error', {allowIndirect: true}],
      'no-floating-decimal': 'error',
      'space-infix-ops': 'error',
      'new-cap': ['error', {capIsNewExceptionPattern: 'Mini$'}],
      'brace-style': ['error', 'stroustrup', {allowSingleLine: true}],
      indent: 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      semi: 'error',
      'prefer-const': 'error',

      'operator-linebreak': ['error', 'after', {overrides: {'?': 'before', ':': 'before'}}],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'unknown', 'type'],
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-throw-literal': 'off',
      'no-unused-labels': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'require-await': 'error',
    },
    files: ['**/*.ts', '**/*.cts', '**.*.mts'],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },
];

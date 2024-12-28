const jsPlugin = require("@eslint/js");
const { fixupPluginRules, includeIgnoreFile } = require('@eslint/compat')
const { FlatCompat } = require('@eslint/eslintrc')
const importPlugin = require("eslint-plugin-import");
// const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptEslint = require("typescript-eslint");
const globals = require("globals");
const typescriptParser = require("@typescript-eslint/parser");
const requireExtensionsPlugin = require("eslint-plugin-require-extensions");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: jsPlugin.configs.recommended,
  allConfig: jsPlugin.configs.all,
});
const gitignorePath = path.resolve(".gitignore");

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  includeIgnoreFile(gitignorePath),
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:require-extensions/recommended',
  ),
  {
    files: ['*.ts',],
    languageOptions: {
      globals: globals["shared-node-browser"],

      parser: typescriptParser,
      ecmaVersion: 2023,
      sourceType: "module",

      parserOptions: {
          project: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          ecmaVersion: 'latest',
          project: ['**/tsconfig.json'],
          projectFolderIgnoreList: ['**/node_modules/**'],
        },
        node: true,
      },
      'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
    },
    rules: {
      'max-len': ['error', {code: 140}],
      'no-eval': ['error', {allowIndirect: true}],
      'no-floating-decimal': 'error',
      'space-infix-ops': 'error',
      'new-cap': ['error', {capIsNewExceptionPattern: 'Mixin$'}],
      'brace-style': ['error', 'stroustrup', {allowSingleLine: true}],
      indent: 'off',
      // '@typescript-eslint/indent': [
      //   'error',
      //   2,
      //   {
      //     SwitchCase: 1,
      //     VariableDeclarator: 1,
      //     outerIIFEBody: 1,
      //     MemberExpression: 1,
      //     FunctionDeclaration: {parameters: 1, body: 1},
      //     FunctionExpression: {parameters: 1, body: 1},
      //     CallExpression: {arguments: 1},
      //     ArrayExpression: 1,
      //     ObjectExpression: 1,
      //     ImportDeclaration: 1,
      //     flatTernaryExpressions: false,
      //     ignoreComments: false,
      //     ignoredNodes: [
      //       'TemplateLiteral *',
      //       'TSTypeParameterInstantiation',
      //       'FunctionExpression > .params[decorators.length > 0]',
      //       'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
      //       'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      //     ],
      //   },
      // ],
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
  },
  {
    files: ['*.cjs', '*.mjs', '*.js'],
    languageOptions: {
      globals: {
          ...globals["commonjs"],
      },

      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: "commonjs",

      parserOptions: {
          project: null,
      },
    },
    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
];


module.exports = config;

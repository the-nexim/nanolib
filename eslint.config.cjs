const globals = require('globals');
const js = require('@eslint/js');

const {FlatCompat} = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = [
  ...compat.extends('@nexim/eslint-config'),
];

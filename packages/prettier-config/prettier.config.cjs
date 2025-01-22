/**
 * @type {import('prettier').Config}
 */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 140,
  arrowParens: 'always',
  proseWrap: 'preserve',
  bracketSpacing: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  tabWidth: 2,
  plugins: [ require.resolve('prettier-plugin-tailwindcss'), require.resolve('prettier-plugin-packagejson') ],
};

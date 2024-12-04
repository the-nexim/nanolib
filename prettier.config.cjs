/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...require('@alwatr/prettier-config'),
  plugins: [require.resolve('prettier-plugin-tailwindcss'), require.resolve('prettier-plugin-packagejson')],
};

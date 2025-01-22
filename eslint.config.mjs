import { baseExtends, jsConfigs, tsConfig } from '@nexim/eslint-config';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, '.gitignore');

const ignorePatterns = includeIgnoreFile(gitignorePath).ignores;

export default [
  ...baseExtends,
  ...tsConfig,
  ...jsConfigs,
  {
    ignores: Array.isArray(ignorePatterns) ? [ ...ignorePatterns, '.yarn' ] : [ './README.md' ],
  },
];

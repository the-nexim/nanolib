import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export const baseExtends = tseslint.config(
  eslintJs.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  tseslint.configs.stylisticTypeChecked,
);

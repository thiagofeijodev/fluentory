import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: true,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
    },
    ignores: ['.config/*'],
  },
];

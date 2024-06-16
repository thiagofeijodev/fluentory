import babelParser from '@babel/eslint-parser';

export default [
  {
    languageOptions: {
      parser: babelParser,
    },
    ignores: ['.config/*'],
  },
];

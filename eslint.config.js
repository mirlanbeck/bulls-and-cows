import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ClassDeclaration',
          message: 'Classes are not allowed, use pure functions.',
        },
        {
          selector: "MemberExpression[property.name='innerHTML']",
          message: 'Do not use innerHTML.',
        },
        {
          selector: "MemberExpression[property.name='insertAdjacentHTML']",
          message: 'Do not use insertAdjacentHTML.',
        },
      ],
    },
  },
  prettier,
);

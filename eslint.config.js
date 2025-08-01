import js from '@eslint/js';
import ts from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import esLintImport from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const customRules = {
  // base
  'max-len': ['warn', { code: 100 }],
  semi: [2, 'always'],

  // eslint-plugin-simple-import-sort
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',

  // eslint-plugin-import
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'error',
  'import/max-dependencies': ['warn', { max: 10, ignoreTypeImports: true }],

  // no-unused-vars
  '@typescript-eslint/no-unused-vars': 'error',
  'no-unused-vars': 'off',
};

const baseConfig = {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

const tsConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: ts,
    ecmaVersion: 2024,
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
      sourceType: 'module',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: {
    'simple-import-sort': simpleImportSort,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    import: esLintImport,
    react,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    ...prettier.rules,
    ...customRules,
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};

const tsTypeCheckedConfig = tsEslint.configs.strictTypeChecked.map(config => {
  if (config.rules) {
    return {
      ...config,
      files: ['**/*.{ts,tsx}'],
    };
  }
  return config;
});

const ignoreConfig = { ignores: ['dist/**/*'] };

const overrideConfig = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
  },
};

export default [
  ignoreConfig,
  baseConfig,
  js.configs.recommended,
  tsConfig,
  ...tsTypeCheckedConfig,
  overrideConfig,
];

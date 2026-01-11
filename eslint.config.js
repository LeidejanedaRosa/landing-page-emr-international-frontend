import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'vite.config.ts',
      'vite.config.d.ts',
      'src/**/*.d.ts',
      'coverage/**',
    ],
  },
  // Plugin files use Node.js types from tsconfig.node.json
  {
    files: ['src/plugins/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.node.json',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
      'unused-imports': unusedImports,
      sonarjs: sonarjs,
      unicorn: unicorn,
      security: security,
    },
    rules: {
      // Base & Prettier
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',

      // Code Quality 🔍 (SonarJS)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-redundant-boolean': 'error',

      // Clean Code 🦄 (Unicorn)
      'unicorn/better-regex': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-modern-math-apis': 'error',

      // Security 🔒
      'security/detect-object-injection': 'off',
      'security/detect-unsafe-regex': 'warn',
      'security/detect-buffer-noassert': 'error',

      // SOLID Principles & Clean Architecture 🏗️
      'max-lines': ['error', 500],
      'max-lines-per-function': ['error', 80],
      'max-params': ['error', 5],
      complexity: ['error', 10],
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 3],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/plugins/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      'unused-imports': unusedImports,
      react: react,
      'jsx-a11y': jsxA11y,
      sonarjs: sonarjs,
      unicorn: unicorn,
      security: security,
    },
    rules: {
      // Base & Prettier
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',

      // React
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': 'error',

      // Accessibility ♿
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/label-has-associated-control': 'error',

      // Code Quality 🔍 (SonarJS)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-redundant-boolean': 'error',

      // Clean Code 🦄 (Unicorn)
      'unicorn/better-regex': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-modern-math-apis': 'error',

      // Security 🔒
      'security/detect-object-injection': 'off', // Muitos falsos positivos em TS
      'security/detect-unsafe-regex': 'warn',
      'security/detect-buffer-noassert': 'error',

      // SOLID Principles & Clean Architecture 🏗️
      'max-lines': ['error', 500], // Aumentado para acomodar arquivos grandes
      'max-lines-per-function': ['error', 80], // Aumentado para componentes React
      'max-params': ['error', 5], // Aumentado para props de componentes
      complexity: ['error', 10],
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 3],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  // Playwright E2E tests - no TypeScript project reference needed
  {
    files: ['tests/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
      'unused-imports': unusedImports,
      sonarjs: sonarjs,
      playwright: playwright,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      ...playwright.configs['flat/recommended'].rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'no-console': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-conditional-expect': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
  // Test files - allow longer functions and more nested callbacks
  {
    files: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      'src/**/*.spec.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
]

// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 0. Global ignores
  {
    ignores: ['dist', 'node_modules'],
  },

  // 1. Base JavaScript recommended rules
  eslint.configs.recommended,

  // 2. TypeScript-ESLint recommended rules (untuk .ts / .tsx)
  ...tseslint.configs.recommended,

  // 3. Sedikit penyesuaian project-mu
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Biarkan TypeScript yang urus unused vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
)

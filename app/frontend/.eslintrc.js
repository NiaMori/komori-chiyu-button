module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],

  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],

  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],

    'react/display-name': 'off',
    'react/prop-types': 'off'
  },

  settings: {
    react: {
      version: 'latest',
    },
  },

  ignorePatterns: ['react-app-env.d.ts'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  }
}

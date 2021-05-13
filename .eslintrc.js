module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaFeatures: {
        legacyDecorators: true
      }
    },
    extends: [
      'plugin:nuxt/recommended',
      'plugin:prettier/recommended',
      'prettier',
      'prettier/vue'
    ],
    plugins: [
      '@typescript-eslint',
      'prettier'
    ],
    // add your custom rules here
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console':0
    }
  }
  
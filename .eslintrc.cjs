module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': 'warn',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    // https://www.npmjs.com/package/unplugin-auto-import#eslint
    'no-undef': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
      },
    ],
    'vue/valid-v-slot': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: '.types/index.d.ts',
      },
    },
  },
};

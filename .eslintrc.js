
const TencentMap_VARS = ['qq']

const globals = {}
TencentMap_VARS.forEach(v => (globals[v] = true))

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', 'eslint:recommended'],
  globals: {
    'window': true,
    ...globals,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'default-case': 'error',
    'func-style': ['error', 'expression'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'no-var': 'error',
    quotes: ['error', 'single', 'avoid-escape'],
    semi: ['error', 'never'],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'components',
          'props',
          'data',
          'computed',
          'watch',
          'methods',
          'beforeCreate',
          'created',
          'beforeMount',
          'mounted',
          'beforeUpdate',
          'updated',
          'beforeDestroy',
          'destroyed',
        ],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}

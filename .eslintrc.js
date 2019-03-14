module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@vue/eslint-config-airbnb',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential'
  ],
  rules: {
    'vue/html-quotes': ['error',  'single'],
    'vue/no-spaces-around-equal-signs-in-attribute': 'off',

    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/camelcase': ['error', { properties: 'never' }],
    'vue/comma-dangle': ['error', 'never'],

    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase', {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],

    // enable next version plugin
    // 'vue/dot-location': ['error', 'property'],

    'vue/eqeqeq': ['error', 'always', { null: 'ignore' }],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],

    'vue/match-component-file-name': [
      'error',
      {
        extensions: [ 'vue', 'jsx', 'js'],
        shouldMatchCase: true
      }
    ],

    'vue/no-boolean-default': ['error', 'default-false'],

    // enable next version plugin
    // 'vue/no-empty-pattern': 'error',

    'vue/no-restricted-syntax': [
      'error',
      {
        'selector': 'CallExpression',
        'message': 'Call expressions are not allowed.'
      }
    ],

    'vue/object-curly-spacing': ['error', 'always'],
    'vue/require-direct-export': 'error',

    // Отключаем за ненадобностью
    // 'vue/script-indent': ['error', 2, {
    //   baseIndent: 0,
    //   switchCase: 0,
    //   ignores: []
    // }],

    'vue/space-infix-ops': 'error',

    'vue/space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
        overrides: {},
      }
    ],

    'vue/v-on-function-call': ['error', 'never'],

    // -------------------------------------------------------

    // require or disallow trailing commas (comma-dangle)
    'comma-dangle': ['error', 'never'],

    //Require parens in arrow function arguments (arrow-parens)
    'arrow-parens': ['error', 'as-needed'],

    // Require Radix Parameter (radix)
    radix: ['error', 'as-needed'],

    // Disallow Reassignment of Function Parameters (no-param-reassign)
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state']
    }],

    // disallow the unary operators ++ and -- (no-plusplus)
    'no-plusplus': 'off',

    // disallow bitwise operators (no-bitwise)
    'no-bitwise': ['error', { allow: ['&'] }],

    // Disallow Assignment in return Statement (no-return-assign)
    'no-return-assign': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['@vue/eslint-config-airbnb', 'plugin:vue/essential'],
  rules: {
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

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

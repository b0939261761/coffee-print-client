module.exports = {
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-browser-hacks/lib',
    'stylelint-selector-tag-no-without-class',
    'stylelint-suitcss',
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-z-index-value-constraint',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  extends: [
    'stylelint-config-standard',
    './stylelint-config-sort.js'
  ],
  rules: {

    // https://github.com/kristerkari/stylelint-high-performance-animation
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: [
        'width',
        'color',
        'border-color',
        'box-shadow',
        'background-color',
        'padding-top',
        'height'
      ] }
    ],

    // https://github.com/Slamdunk/stylelint-no-browser-hacks
    'plugin/no-browser-hacks': true,

    // https://github.com/Moxio/stylelint-selector-tag-no-without-class
    'plugin/selector-tag-no-without-class': ['div', 'span'],

    // https://github.com/suitcss/stylelint-suitcss/blob/master/rules/root-no-standard-properties/README.md
    'suitcss/root-no-standard-properties': true,

    // https://github.com/suitcss/stylelint-suitcss/blob/master/rules/selector-root-no-composition/README.md
    'suitcss/selector-root-no-composition': true,

    // https://github.com/suitcss/stylelint-suitcss/blob/master/rules/custom-property-no-outside-root/README.md
    'suitcss/custom-property-no-outside-root': null,

    // https://github.com/csstools/stylelint-value-no-unknown-custom-properties
    'csstools/value-no-unknown-custom-properties': null,

    // https://github.com/kristerkari/stylelint-z-index-value-constraint
    'plugin/z-index-value-constraint': {
      min: 1,
      max: 5
    },

    // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
    'plugin/declaration-block-no-ignored-properties': true,

    "color-no-invalid-hex": true,
    'number-leading-zero': 'never',
    "font-family-name-quotes": "always-unless-keyword",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "function-calc-no-unspaced-operator": true,

  }
}

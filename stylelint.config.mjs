export default {
  overrides: [
    {
      files: ['**/*.css'],
      extends: ['stylelint-config-standard'],
      rules: {},
    },
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
      rules: {
        // Disabled rules
        'scss/comment-no-empty': null,
        'scss/dollar-variable-empty-line-before': null,
        'scss/double-slash-comment-empty-line-before': null,
        'scss/operator-no-newline-after': null,
        'scss/operator-no-newline-before': null,

        // Customized rules
        'scss/at-mixin-argumentless-call-parentheses': 'always',
      },
    },
  ],
  rules: {
    // Disabled rules
    'at-rule-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'rule-empty-line-before': null,

    // Customized rules

    'alpha-value-notation': 'percentage',

    'color-named': [
      'never',
      { message: 'Avoid hardcoding colors; use theming system instead' },
    ],

    'color-no-hex': [
      true,
      { message: 'Avoid hardcoding colors; use theming system instead' },
    ],

    'color-no-invalid-hex': true,

    'custom-property-pattern': [
      '^(?!(mat|mdc)-)',
      {
        severity: 'error',
        message:
          'Avoid referencing Material vars; use theming system instead',
      },
    ],

    'declaration-no-important': [true, { severity: 'error' }],

    'font-family-name-quotes': 'always-unless-keyword',

    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Material Icons'],
      },
    ],

    'function-linear-gradient-no-nonstandard-direction': true,
    'function-no-unknown': true,
    'function-url-quotes': 'always',

    'no-invalid-position-declaration': [
      true,
      { ignoreAtRules: ['mixin'] },
    ],

    'selector-max-id': [
      0,
      {
        message:
          'Avoid styling via HTML element IDs (and generally avoid using' +
          ' IDs unless absolutely necessary)',
      },
    ],

    // Forbid class selectors that start with `mat-` or `mdc-`,
    // with an exception for `mat-column-`.
    'selector-class-pattern': [
      '^(?!(mat(?!-column)|mdc)-)',
      {
        severity: 'error',
        resolveNestedSelectors: true,
        message:
          'Avoid styling via Material classes; use theming system instead',
      },
    ],

    'selector-pseudo-element-no-unknown': true,

    'unit-no-unknown': true,
    'value-keyword-case': ['lower', { ignoreKeywords: ['currentColor'] }],
  },
};

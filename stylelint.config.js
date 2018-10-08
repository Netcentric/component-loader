module.exports = {
  extends: './frontend/node_modules/stylelint-config-standard/index.js',
  rules: {
    'no-missing-end-of-source-newline': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'at-rule-no-unknown': null,
    'selector-max-specificity': '0,5,0',
    'selector-max-compound-selectors': 7,
    'font-family-name-quotes': 'always-unless-keyword',
    'string-quotes': 'single',
    'function-url-quotes': 'always',
    'declaration-no-important': true,
    'declaration-property-unit-whitelist': {
      'font-size': ['px', 'em']
    }
  }
};

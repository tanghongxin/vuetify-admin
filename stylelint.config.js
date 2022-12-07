module.exports = {
  defaultSeverity: 'error',
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'selector-max-id': 1,
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-no-qualifying-type': [true, {
      ignore: ["attribute", "class", "id"],
    }],
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
    // https://github.com/simonsmith/stylelint-selector-bem-pattern/issues/23
    "selector-class-pattern": "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
  },
}

module.exports = {
  defaultSeverity: 'error',
  extends: 'stylelint-config-sass-guidelines',
  plugins: ['stylelint-scss'],
  rules: {
    'selector-max-id': 1,
    'selector-no-qualifying-type': [true, {
      ignore: ["attribute", "class", "id"],
    }],
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
    // https://github.com/simonsmith/stylelint-selector-bem-pattern/issues/23
    "selector-class-pattern": "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
  },
}

module.exports = {
  defaultSeverity: 'error',
  extends: [],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    // 禁止声明重复属性
    'declaration-block-no-duplicate-properties': true,
    // 结尾必须有分号
    'declaration-block-trailing-semicolon': 'always',
    // 冒号之后空格
    'declaration-colon-space-after': 'always',
    // 冒号之前不空格
    'declaration-colon-space-before': 'never',
    // url()内必须跟引号
    'function-url-quotes': 'always',
    'indentation': 2,
    'max-nesting-depth': 3,
    // 文件末尾留一行
    'no-missing-end-of-source-newline': true,
    // 禁止多余的分号
    'no-extra-semicolons': true,
    // 规则前必须空一行
    'rule-empty-line-before': 'always',
    // 多选择器逗号换行
    'selector-list-comma-newline-after': 'always',
    'selector-no-vendor-prefix': true,
    // 伪类使用单引号
    'selector-pseudo-element-colon-notation': 'single',
    // 只允许使用单引号
    'string-quotes': 'single',
    // 单位小写
    'unit-case': 'lower',
    'selector-combinator-space-after': 'always',
    // 行注释输入前空一格
    'scss/double-slash-comment-whitespace-inside': 'always',
    // 指定声明块内属性的字母顺序
    'order/properties-order': [
      'box-sizing',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'width',
      'height',
      'line-height',
      'vertical-align',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'color',
      'font',
      'cursor',
      'pointer-events',
      'background',
      'background-attachment',
      'background-clip',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'zoom',
      'box-shadow',
      'animation',
      'transform',
      'transition',
    ],
  },
}

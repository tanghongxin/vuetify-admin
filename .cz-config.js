module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     新增功能',
    },
    {
      value: 'fix',
      name: 'fix:      bug 修复',
    },
    {
      value: 'style',
      name: 'style:    不影响程序逻辑的代码修改（代码缩进、空白字符等）',
    },
    {
      value: 'chore',
      name: 'chore:    其他类型（杂项）',
    },
    {
      value: 'merge',
      name: 'merge:    分支合并',
    },
    {
      value: 'WIP',
      name: 'WIP:      仍在进行中',
    },
    {
      value: 'perf',
      name: 'perf:     性能、代码可读性改进',
    },
    {
      value: 'docs',
      name: 'docs:     文档更新',
    },
    {
      value: 'refactor',
      name: 'refactor: 重构',
    },
    {
      value: 'test',
      name: 'test:     新增测试用例或是更新现有测试',
    },
    {
      value: 'revert',
      name: 'revert:   回滚',
    },
    {
      value: 'build',
      name: 'build:    构建、打包、部署配置修改',
    },
    {
      value: 'ci',
      name: 'ci:       持续集成配置（GitLab等）',
    },
  ],
  // scopes: [
  //   {name: 'component'},
  //   {name: 'config'},
  //   {name: 'css'},
  //   {name: 'format'},
  //   {name: 'empty'},
  // ],
  messages: {
    type: '选择一种你的提交类型:\n',
    // scope: '选择作用范围 (可选):\n',
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    customScope: '代码作用范围 (可选) :\n',
    subject: '标题简短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '兼容性更改 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build',
      'ci', 
      'docs', 
      'feat', 
      'merge', 
      'fix', 
      'perf', 
      'refactor', 
      'style', 
      'test', 
      'revert', 
      'chore',
      'WIP',
    ]],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
}

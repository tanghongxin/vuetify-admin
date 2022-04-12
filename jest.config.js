module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  collectCoverage: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}

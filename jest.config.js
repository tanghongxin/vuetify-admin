module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  collectCoverage: true,
  // collectCoverageFrom: [
  //   "<rootDir>/src/components/**/*.{jsx,vue}",
  //   "<rootDir>/src/utils/**/*.{js,jsx}",
  // ],
  coverageReporters: ["text", "html"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}

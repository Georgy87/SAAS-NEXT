// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@root(.*)$": "<rootDir>/src$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@mocks(.*)$": "<rootDir>/src/__mocks__$1"
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
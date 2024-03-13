import type { Config } from 'jest';
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: './*\\.test\\.ts$',
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*',
    '!**/node_modules/**',
    '!src/interfaces/**',
    '!src/index.ts',
    '!src/models/model.ts',
  ],
  coverageDirectory: 'tests/coverage',
  coverageThreshold: {
    global: {
      functions: 60,
      lines: 50,
      branches: 70
    },
  }
};
export default config;
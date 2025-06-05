module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@supabase/supabase-js|@babel/runtime|@babel/helpers|@babel/plugin-transform-runtime|@babel/runtime-corejs3)/)'
  ],
  extensionsToTreatAsEsm: ['.jsx'],
  globals: {
    'import.meta': {}
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
  resolver: undefined,
  verbose: true,
  testURL: 'http://localhost:3000',
  testTimeout: 30000
};
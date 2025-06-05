module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!(.*\\.mjs$|@supabase/supabase-js)/)',
  ],
  extensionsToTreatAsEsm: ['.jsx'],
  globals: {
    'import.meta': {}
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  }
};
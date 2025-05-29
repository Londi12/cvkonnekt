module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@supabase|@babel)/)'
  ],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
}; 
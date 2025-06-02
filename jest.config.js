module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }]
      ]
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@supabase|@headlessui)/)'
  ],
  globals: {
    'import.meta': {
      env: {
        VITE_SUPABASE_URL: 'test-url',
        VITE_SUPABASE_ANON_KEY: 'test-key'
      }
    }
  }
}; 
/**
 * Jest Configuration
 * Configures Jest testing framework for the DSAlgo repository
 */

export default {
  // Test environment
  testEnvironment: 'node',
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Coverage configuration
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Transform configuration
  transform: {
    '^.+\.js$': 'babel-jest'
  },
  
  // Module directories
  moduleDirectories: ['node_modules'],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Exit process after tests complete
  forceExit: true
};

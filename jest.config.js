module.exports = {
    preset: 'ts-jest', // Use ts-jest for handling TypeScript files
    testEnvironment: 'jsdom', // Use jsdom for simulating the browser environment
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest', // Use babel-jest for transforming TypeScript files
    },
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy" // Mock CSS modules for tests
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom" // Setup additional Jest matchers
    ],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)", // Look for test files in __tests__ folder
        "**/?(*.)+(spec|test).[jt]s?(x)" // Match test files by name
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'] // Recognize files extensions
};
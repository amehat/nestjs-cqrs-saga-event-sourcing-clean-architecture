module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/__test__/**/*.unit.ts',
    ],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@infra/(.*)$': '<rootDir>/src/infra/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    },
};
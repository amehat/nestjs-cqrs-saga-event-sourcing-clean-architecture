module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/__test__/**/*.spec.ts',
        '**/__test__/**/*.test.ts',
        '**/__test__/**/*.step.ts',
        '**/__test__/**/*.spec.ts',
        '**/__test__/**/*.test.ts',
        '**/__test__/**/*.step.ts',
        '**/__test__/**/*.e2e.ts',
        '**/__test__/**/*.unit.ts',
    ],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@infra/(.*)$': '<rootDir>/src/infra/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    },
};
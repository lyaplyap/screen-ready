module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/code'],
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '^@code/(.*)$': '<rootDir>/src/code/$1'
    },
    setupFiles: ['<rootDir>/src/code/__tests__/setup-figma.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                target: 'es2020',
                module: 'commonjs',
                jsx: 'react',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                experimentalDecorators: true,
                strictNullChecks: true,
                noImplicitAny: false,
                baseUrl: '.',
                paths: {
                    '@code/*': ['src/code/*'],
                    '@ui/*': ['src/ui/*']
                },
                typeRoots: ['./node_modules/@types', './node_modules/@figma']
            }
        }]
    }
};

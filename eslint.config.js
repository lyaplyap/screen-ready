const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');

module.exports = tseslint.config(
    {
        ignores: [
            'dist/',
            'node_modules/',
            'webpack.config.js',
            'eslint.config.js',
            'jest.config.js',
            'storybook-static'
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                figma: 'readonly',
                __html__: 'readonly',
                __uiFiles__: 'readonly',
            },
        },
        settings: {
            react: { version: 'detect' },
            'import/internal-regex': '^@(code|ui)/',
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],

            'import/order': ['error', {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    ['parent', 'sibling', 'index'],
                ],
                pathGroups: [
                    {
                        pattern: '../**',
                        group: 'parent',
                        position: 'before',
                    },
                    {
                        pattern: './**',
                        group: 'sibling',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            }],
            'simple-import-sort/exports': 'warn',

            indent: ['error', 4, { SwitchCase: 1 }],
            semi: ['error', 'always'],
            quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
            'eol-last': ['error', 'always'],
            'no-undef': 'off',

            'no-restricted-imports': ['warn', {
                patterns: [{
                    group: ['../../**'],
                    message: 'Avoid deep relative imports (../../ and deeper). Use path aliases instead (e.g. @code/... or @ui/...).',
                }],
            }],

            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'prefer-const': 'warn',
            'object-shorthand': ['warn', 'always'],
        },
    },
);

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        project: './*/tsconfig.json',
        extraFileExtensions: ['.svelte']
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
    ],
    ignorePatterns: [
        '*.d.ts',
        '**/build/**', '**/node_modules/**', '**/.svelte-kit/**', '**/dist/**'
    ],
    overrides: [
        {
            'files': ['*.svelte'],
            'parser': 'svelte-eslint-parser',
            'parserOptions': {
                'parser': '@typescript-eslint/parser'
            }
        },
    ],
    rules: {
        /* Javascript / Typescript
        ========================================= */
        // Use spaces over tabs
        'no-tabs': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        // Use single quote in javascript
        quotes: ['error', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true
        }],
        // Avoid semicolons
        semi: ['error', 'never'],
        // Avoid ==
        eqeqeq: 'error',
        // Avoid trailing spaces
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        // Add a space between curlies
        'object-curly-spacing': ['error', 'always'],
        // Require a line at end of file
        'eol-last': ['error', 'always'],
        // Allow ts exceptions
        '@typescript-eslint/ban-ts-comment': ['error', {
            'ts-ignore': false,
            'ts-nocheck': false,
            'ts-expect-error': 'allow-with-description',
        }],
        // Ignore some no-used-vars
        '@typescript-eslint/no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
        }],

        /* Svelte
        ========================================= */
        // Use double quotes
        'svelte/html-quotes': ['error', {
            prefer: 'double',
            dynamic: {
                quoted: false,
                avoidInvalidUnquotedInHTML: false,
            }
        }],
        // Enable @html
        'svelte/no-at-html-tags': 'off',
    },
    settings: {
    },
}

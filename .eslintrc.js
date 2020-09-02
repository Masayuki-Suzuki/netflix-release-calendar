module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        extraFileExtensions: ['.vue']
    },
    rules: {
        '@typescript-eslint/ban-types': [
            2,
            {
                types: {
                    object: 'Do not use object',
                    Object: 'Do not use object'
                }
            }
        ],
        '@typescript-eslint/camelcase': [0],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/interface-name-prefix': [0, 'never'],
        '@typescript-eslint/member-delimiter-style': [2, { multiline: { delimiter: 'none' } }],
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-var-requires': 0,
        'arrow-parens': [2, 'as-needed'],
        'brace-style': [0, 'never'],
        'comma-dangle': [2, 'never'],
        curly: [2, 'all'],
        indent: [1, 4, { SwitchCase: 1 }],
        'lines-between-class-members': 0,
        'max-len': [
            1,
            {
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        'new-parens': 2,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-irregular-whitespace': 1,
        'no-multiple-empty-lines': [1, { max: 1 }],
        'no-new': 0,
        'no-trailing-spaces': 1,
        'no-unused-expressions': 0,
        'no-undef-init': 'error',
        'no-var': 2,
        'object-shorthand': 2,
        'object-curly-newline': [
            1,
            {
                ObjectExpression: { multiline: true, minProperties: 4, consistent: true },
                ImportDeclaration: 'never',
                ExportDeclaration: 'never'
            }
        ],
        'object-curly-spacing': [1, 'always'],
        'one-var-declaration-per-line': 2,
        'padded-blocks': 0,
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'require-await': 1,
        semi: [2, 'never'],
        'space-before-function-paren': [0, 'never'],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ]
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
}

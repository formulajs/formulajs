import js from '@eslint/js'

export default [
  { ignores: ['coverage', 'lib', 'mochawesome-report'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        should: 'readonly',
        xit: 'readonly'
      },
      sourceType: 'module'
    }
  },
  js.configs.recommended,
  {
    rules: {
      'no-control-regex': 'off'
    }
  }
]

import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['coverage', 'lib', 'mochawesome-report'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        should: 'readonly',
        xit: 'readonly',
        ...globals.node
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

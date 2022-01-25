import fs from 'fs'
import pkg from './package.json'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

fs.rmSync('lib', { recursive: true, force: true })
fs.rmSync('dist', { recursive: true, force: true })

const banner = `/* ${pkg.name} v${pkg.version} */`

const libBase = {
  input: './src/index.js',
  external: ['bessel', 'jstat'],
  plugins: [resolve(), commonjs()]
}

const cjsConfig = {
  ...libBase,
  output: {
    format: 'cjs',
    file: 'lib/cjs/index.cjs',
    exports: 'auto'
  }
}

const esmConfig = {
  ...libBase,
  output: {
    format: 'es',
    file: 'lib/esm/index.mjs'
  }
}

const umdConfig = {
  ...libBase,
  output: [
    {
      format: 'umd',
      file: 'lib/browser/formula.js',
      name: 'formulajs',
      banner: banner,
      compact: true
    },
    {
      format: 'umd',
      file: 'lib/browser/formula.min.js',
      name: 'formulajs',
      sourcemap: true,
      plugins: [terser({ format: { preamble: banner } })]
    }
  ],
  external: []
}

export default [cjsConfig, esmConfig, umdConfig]

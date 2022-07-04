import fs from 'fs'
import pkg from './package.json'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

fs.rmSync('lib', { recursive: true, force: true })

const banner = `/* ${pkg.name} v${pkg.version} */`

const baseConfig = {
  input: 'src/index.js',
  external: ['bessel', 'jstat'],
  plugins: [resolve(), commonjs()]
}

const nodeConfig = {
  ...baseConfig,
  output: [
    { format: 'cjs', file: 'lib/cjs/index.cjs' },
    { format: 'esm', file: 'lib/esm/index.mjs' }
  ]
}

const umdConfig = {
  ...baseConfig,
  external: [],
  output: [
    {
      format: 'umd',
      file: 'lib/browser/formula.js',
      name: 'formulajs',
      plugins: [
        getBabelOutputPlugin({ presets: ['@babel/preset-env'], allowAllFormats: true, compact: true }),
        terser({ compress: false, mangle: false, format: { beautify: true, indent_level: 2, preamble: banner } })
      ]
    },
    {
      format: 'umd',
      file: 'lib/browser/formula.min.js',
      name: 'formulajs',
      plugins: [
        getBabelOutputPlugin({ presets: ['@babel/preset-env'], allowAllFormats: true, compact: true }),
        terser({ format: { preamble: banner } })
      ],
      sourcemap: true
    }
  ]
}

export default [nodeConfig, umdConfig]

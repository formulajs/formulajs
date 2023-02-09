import * as fs from 'fs'

import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

fs.rmSync('lib', { recursive: true, force: true })

const pkg = JSON.parse(fs.readFileSync('./package.json'))
const banner = `/* ${pkg.name} v${pkg.version} */`

const baseConfig = {
  input: 'src/index.js',
  external: ['bessel', 'jstat'],
  plugins: [resolve(), commonjs()]
}

const nodeConfig = {
  ...baseConfig,
  output: [
    {
      format: 'cjs',
      dir: 'lib/cjs',
      preserveModules: true
    },
    { format: 'esm', dir: 'lib/esm', preserveModules: true }
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

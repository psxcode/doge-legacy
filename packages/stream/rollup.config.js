import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.ts',
  output: {
    format: 'es',
    file: 'dist/index.mjs'
  },

  plugins: [
    typescript(),
    nodeResolve(),
    commonjs()
  ],

  external: ['stream', '@doge/helpers', '@doge/iterable']
}

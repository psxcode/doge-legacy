import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    format: 'es',
    file: 'dist/index.mjs'
  },

  plugins: [
    typescript()
  ],

  external: [],
}

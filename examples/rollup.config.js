import node from 'rollup-plugin-node-resolve'

export default {
  extend: true,
  input: 'index.js',
    output: {
      file: 'main.js',
      format: 'umd',
      name: 'example'
    },
    plugins: [node()]
}

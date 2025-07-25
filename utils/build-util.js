import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'packages/util/index.ts', // 输入文件路径
  output: {
    file: 'dist/util/index.js' // 输出文件路径
  },
  plugins: [
    typescript()
  ]
}

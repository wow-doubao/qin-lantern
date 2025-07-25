import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'packages/locale/index.ts', // 输入文件路径
  output: {
    file: 'dist/locale/index.js' // 输出文件路径
  },
  plugins: [
    typescript()
  ]
}

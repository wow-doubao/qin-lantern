// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    typescript: true,
    stylistic: {
      overrides: {
        'antfu/top-level-function': 'off',
      },
    },
  },
  // {
  //   languageOptions: {
  //     parserOptions: {
  //       project: './tsconfig.json', // 如果需要项目配置
  //     },
  //   },
  // },
)

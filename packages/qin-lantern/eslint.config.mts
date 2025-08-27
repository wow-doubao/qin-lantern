// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: {
      overrides: {
        'antfu/top-level-function': 'off',
      },
    },
    vue: true,
    typescript: true,
  },
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    },
  },
)

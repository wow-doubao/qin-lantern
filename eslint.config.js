import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import neostandard from 'neostandard'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  ...neostandard(),
  ...compat.extends('./typings/.eslintrc-auto-import.json'),
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  },
  {
    ignores: ['docs/!.vitepress', 'docs/.vitepress/cache']
  }
]

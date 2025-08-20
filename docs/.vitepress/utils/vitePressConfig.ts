import path from 'node:path'
import UnoCSS from 'unocss/vite'
// import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import eslint from 'vite-plugin-eslint'

const resolve = {
  alias: {
    '@': path.resolve(__dirname, '..', '..', '..', './docs'),
  },
}

export const vitePressConfig = {
  resolve,
  plugins: [
    UnoCSS(),
    eslint(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(__dirname, '..', '..', './types/auto-imports.d.ts'),
      eslintrc: {
        enabled: true, // Default `false`
        filepath: path.resolve(__dirname, '..', '..', './types/.eslintrc-auto-import.json'), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        // 插件预设支持导入的api
        'vue',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(__dirname, '..', '..', './types/components.d.ts'),
    }),
  ],
  ssr: {
    noExternal: ['element-plus', '@wangeditor/editor'],
  },
  server: {
    host: '0.0.0.0',
  },
}

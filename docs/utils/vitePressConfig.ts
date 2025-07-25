// import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import eslint from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'
import path from 'path'

const resolve = {
  alias: {
    'qin-lantern': path.resolve(__dirname, '..', '..', './packages'),
    '@': path.resolve(__dirname, '..', '..', './docs')
  }
}

export const vitePressConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  },
  resolve,
  plugins: [
    ElementPlus({}),
    UnoCSS(),
    eslint(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(__dirname, '..', '..', './typings/auto-imports.d.ts'),
      eslintrc: {
        enabled: true, // Default `false`
        filepath: path.resolve(__dirname, '..', '..', './typings/.eslintrc-auto-import.json'), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        // 插件预设支持导入的api
        'vue'
      ]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(__dirname, '..', '..', './typings/components.d.ts')
    })
  ],
  ssr: {
    noExternal: ['element-plus', '@wangeditor/editor']
  },
  server: {
    host: '0.0.0.0'
  }
}

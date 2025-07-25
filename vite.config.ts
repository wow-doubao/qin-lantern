import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
// import eslint from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'
import path from 'path'
import dts from 'vite-plugin-dts'

const resolve = {
  alias: {
    'qin-lantern': path.resolve(__dirname, './packages'),
    '@': path.resolve(__dirname, './docs')
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve,
  plugins: [
    vue(),
    ElementPlus({}),
    UnoCSS(),
    dts({
      exclude: ['./packages/hooks', './packages/utils']
    }),
    AutoImport({
      dts: path.resolve(__dirname, './typings/auto-imports.d.ts'),
      eslintrc: {
        enabled: true, // Default `false`
        filepath: path.resolve(__dirname, './typings/.eslintrc-auto-import.json'), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        // 插件预设支持导入的api
        'vue'
      ]
    })
    // eslint({
    //   // failOnError: false,
    // })
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'qin-lantern'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})

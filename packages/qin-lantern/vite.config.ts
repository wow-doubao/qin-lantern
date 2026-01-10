import { promises as fs } from 'node:fs'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
// import eslint from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

function copyStyles() {
  return {
    name: 'copy-styles',
    closeBundle: async () => {
      const srcDir = path.resolve(__dirname, './src/styles')
      const destDir = path.resolve(__dirname, './dist/styles')
      try {
        await fs.cp(srcDir, destDir, { recursive: true })
        console.log('Styles copied to dist/styles')
      }
      catch (e) {
        console.error('Failed to copy styles:', e)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'qin-lantern': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    UnoCSS(),

    AutoImport({
      dts: path.resolve(__dirname, './src/types/auto-imports.d.ts'),
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: path.resolve(__dirname, './src/types/.eslintrc-auto-import.json'), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        // 插件预设支持导入的api
        'vue',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: false, // 不引入样式，避免打包到产物中
      })],
      dts: './src/types/components.d.ts',
    }),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: [
        './src',
        // './src/index.ts',
        // './src/locale/index.ts',
        // '../utils/index.ts',
      ],
      exclude: ['./src/main.ts'],
    }),
    // eslint({
    //   // failOnError: false,
    // })
    copyStyles(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        'qin-lantern': path.resolve(__dirname, './src/index.ts'),
        'locale/index': path.resolve(__dirname, './src/locale/index.ts'),
        'resolver/index': path.resolve(__dirname, './src/resolver/index.ts'),
        // 'utils/index': path.resolve(__dirname, '../utils/index.ts'),
      },
      // entry: path.resolve(__dirname, './src/index.ts'),
      name: 'qin-lantern',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
})

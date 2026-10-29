import path from 'node:path'
import { QinLanternResolver } from 'qin-lantern'
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
  build: {
    // 文档站整包引入 element-plus，chunk 偏大属正常，放宽告警阈值
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    // 复用组件库的 uno 配置（presets/icons），避免 "Config file not found" 告警
    UnoCSS({ configFile: path.resolve(__dirname, '..', '..', '..', './packages/qin-lantern/uno.config.ts') }),
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
      resolvers: [ElementPlusResolver(), QinLanternResolver()],
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

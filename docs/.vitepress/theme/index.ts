import type { Theme } from 'vitepress'
// import QlUi from 'qin-lantern'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import DefaultTheme from 'vitepress/theme'
import 'virtual:uno.css'
// https://vitepress.dev/guide/custom-theme
// import { h } from 'vue'
// import 'qin-lantern/dist/qin-lantern.css'
// import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  extends: DefaultTheme,
  // element-plus SSR 需要 id provider，否则渲染时报 IdInjection 告警且 hydration 可能不一致
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, { prefix: 100, current: 0 })
    // 同理提供 z-index provider，避免 SSR 时 ZIndexInjection 告警
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  // enhanceApp({ app }) {
  //   app.use(QlUi)
  //   // ...
  // },
} satisfies Theme

import type { Theme } from 'vitepress'
// import QlUi from 'qin-lantern'
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

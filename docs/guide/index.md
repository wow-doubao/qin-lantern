# 安装

## 使用包管理器

::: code-group
```shell [npm]
$ npm install qin-lantern
```
```shell [yarn]
$ yarn add qin-lantern
```
```shell [pnpm]
$ pnpm install qin-lantern
```
:::

### 完整引入
``` ts
import QinLantern from 'qin-lantern'
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'qin-lantern/dist/qin-lantern.css'

const app = createApp(App)

app.use(QinLantern)
app.mount('#app')
```

### 自动导入 <Badge type="tip" text="推荐" />
首先你需要安装 **unplugin-vue-components** 这款插件
::: code-group
```shell [npm]
$ npm install -D unplugin-vue-components
```
```shell [yarn]
$ yarn add -D unplugin-vue-components
```
```shell [pnpm]
$ pnpm install -D unplugin-vue-components
```
:::
然后把下列代码插入到你的 **Vite** 的配置文件中
``` ts [vite.config.ts]
import { QinLanternResolver } from 'qin-lantern'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  plugins: [
    Components({
      resolvers: [QinLanternResolver()],
    }),
  ],
})
```

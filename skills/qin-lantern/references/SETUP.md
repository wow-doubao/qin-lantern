# 安装与配置

## 安装

```bash
pnpm add qin-lantern
```

依赖 Element Plus（peerDependency），需同时安装：

```bash
pnpm add element-plus @element-plus/icons-vue
```

## 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import QlLantern from 'qin-lantern'
import 'qin-lantern/dist/qin-lantern.css'
import App from './App.vue'

const app = createApp(App)
app.use(QlLantern)
app.mount('#app')
```

## 自动导入（推荐）

配合 `unplugin-vue-components` 实现按需导入，无需手动注册：

```ts
// vite.config.ts
import { QinLanternResolver } from 'qin-lantern/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        QinLanternResolver({
          importStyle: 'css', // 或 'sass' 导入源样式文件
        }),
      ],
    }),
  ],
})
```

配置后，在 `.vue` 文件中直接使用 `Ql` 前缀组件即可自动导入，无需手动 import。

## 命名空间配置

默认 CSS 类名前缀为 `ql-`，Element Plus 前缀为 `el-`。通过 QlConfigProvider 覆盖：

```vue
<template>
  <QlConfigProvider namespace="my-app" el-namespace="my-ep">
    <QlButton>自定义命名空间</QlButton>
  </QlConfigProvider>
</template>
```

对应的 SCSS 变量也需同步覆盖（如果使用 sass 源样式导入）。

## 国际化配置

默认支持中文（zhCn）和英文（en）：

```vue
<script setup>
import { en } from 'qin-lantern/locale'
</script>

<template>
  <QlConfigProvider :ql-locale="en">
    <App />
  </QlConfigProvider>
</template>
```

## 上传配置

通过 QlConfigProvider 统一配置上传接口地址和请求头：

```vue
<template>
  <QlConfigProvider
    :ql-upload="{
      action: 'https://api.example.com/upload',
      headers: { Authorization: 'Bearer token' },
    }"
  >
    <QlUpload />
  </QlConfigProvider>
</template>
```
# QlConfigProvider

全局配置提供者，用于统一管理命名空间、国际化语言、上传配置。

## Props

```ts
const props = defineProps({
  qlLocale: {
    type: Object as PropType<QlLanguage>,
    default: null,         // 语言包（默认中文 zhCn）
  },
  qlUpload: {
    type: Object as PropType<QlUploadConfig>,
    default: null,         // 上传配置
  },
  namespace: {
    type: String,
    default: 'ql',         // 组件库 CSS 类名前缀
  },
  elNamespace: {
    type: String,
    default: 'el',         // Element Plus CSS 类名前缀
  },
})
```

## 类型

```ts
interface QlUploadConfig {
  action: string                    // 上传接口地址
  headers: Headers | Record<string, any>  // 请求头
}

interface QlLanguage {
  name: string
  ql: TranslatePair
}
```

## 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 子组件内容 |

## 使用场景

### 1. 命名空间覆盖

需要与现有项目的 Element Plus 命名空间隔离时：

```vue
<template>
  <QlConfigProvider namespace="my-ql" el-namespace="my-ep">
    <QlCard>
      <!-- 所有 CSS 类名前缀变为 my-ql- 和 my-ep- -->
    </QlCard>
  </QlConfigProvider>
</template>
```

### 2. 国际化

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

### 3. 上传配置

```vue
<template>
  <QlConfigProvider
    :ql-upload="{
      action: 'https://api.example.com/upload',
      headers: { Authorization: `Bearer ${token}` },
    }"
  >
    <QlUpload v-model="imageUrl" />
    <QlWizardUpload v-model="urls" />
  </QlConfigProvider>
</template>
```

### 4. 组合使用

```vue
<script setup>
import { en } from 'qin-lantern/locale'
</script>

<template>
  <QlConfigProvider
    :ql-locale="en"
    :ql-upload="{ action: '/api/upload', headers: {} }"
    namespace="app"
    el-namespace="app-ep"
  >
    <router-view />
  </QlConfigProvider>
</template>
```

## 注意事项

- 命名空间修改后，SCSS 变量也需要同步覆盖（如果使用 sass 源样式导入）
- 建议在 App.vue 的根节点使用，包裹整个应用
# QlUpload / QlWizardUpload

## QlUpload

基于 ElUpload 的图片上传组件，封装了预览、大小限制、数量限制、禁用态展示。

### Props

```ts
defineProps({
  modelValue: {
    type: String,
    default: '',           // 图片 URL 字符串（多张用逗号分隔）
  },
  disabled: {
    type: Boolean,
    default: false,        // 禁用态（仅展示图片，不可上传）
  },
  limit: {
    type: Number,
    default: null,         // 最大上传数量（null 不限制）
  },
  size: {
    type: Number,
    default: null,         // 单文件大小限制（MB），null 不限制
  },
})
```

### Events

```ts
const emit = defineEmits([
  'update:modelValue',    // 图片 URL 变化时触发
  'success',              // 上传成功时触发，参数为 URL 数组
])
```

### 行为说明

- `modelValue` 为逗号分隔的 URL 字符串（如 `"url1,url2,url3"`）
- 上传成功后自动拼接 URL 到 `modelValue`
- 达到 `limit` 上限时自动隐藏上传按钮
- 超出 `size` 限制时弹出警告并阻止上传
- `disabled` 为 true 时仅展示图片，支持预览
- 上传接口地址和请求头通过 QlConfigProvider 的 `ql-upload` 全局配置
- 使用 `useExpose` 暴露 ElUpload 实例的所有方法

### 基本示例

```vue
<script setup lang="ts">
const imageUrl = ref('')
</script>

<template>
  <QlUpload
    v-model="imageUrl"
    :limit="3"
    :size="5"
    @success="(urls) => console.log('上传成功', urls)"
  />
</template>
```

### 禁用态示例

```vue
<template>
  <QlUpload
    v-model="imageUrl"
    :disabled="true"
  />
</template>
```

---

## QlWizardUpload

向导式上传组件，支持多条目的图片/视频/文件上传，每个条目独立上传并预览。

### Props

```ts
const { action, headers, type, size, max } = defineProps({
  action: {
    type: String,
    default: void 0,        // 上传接口地址
  },
  headers: {
    type: Object,
    default: () => ({}),    // 请求头
  },
  type: {
    type: String,
    default: 'image',       // 上传类型：'image' | 'video' | 'file'
    validator: (value: string) => ['image', 'video', 'file'].includes(value),
  },
  size: {
    type: Number,
    default: 8,             // 单文件大小限制（MB）
  },
  max: {
    type: Number,
    default: null,          // 最大条目数（null 不限制）
  },
})
```

### v-model

```ts
const modelValue = defineModel<string[]>({
  type: Array,
  default: () => [''],
})
```

每条记录对应一个 URL 字符串，初始为 `['']`（一个空条目）。

### 行为说明

- 每个条目有独立的"上传"和"预览"按钮
- 上传按钮打开上传弹窗（内部使用 UploadDialog）
- 预览按钮打开预览弹窗（内部使用 ViewDialog）
- 支持动态增加/删除条目，通过 `+/-` 按钮操作
- `max` 限制最大条目数，达到上限后隐藏 `+` 按钮
- 使用 `useDialog` 管理上传和预览弹窗的状态

### 基本示例

```vue
<script setup lang="ts">
const urls = ref<string[]>([''])
</script>

<template>
  <QlWizardUpload
    v-model="urls"
    action="https://api.example.com/upload"
    :headers="{ Authorization: 'Bearer token' }"
    type="image"
    :size="10"
    :max="5"
  />
</template>
```

## 与 Element Plus 的差异

- **QlUpload**: 内置图片预览弹窗、数量/大小限制校验、禁用态展示、上传配置统一管理
- **QlWizardUpload**: ElUpload 不支持多条目向导式上传，这是完全自定义的业务组件
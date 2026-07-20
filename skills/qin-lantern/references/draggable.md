# QlDraggable

基于 SortableJS 的拖拽排序容器组件。

## Props

```ts
defineProps({
  options: {
    type: Object,
    default: () => ({}),   // SortableJS 配置项（透传）
  },
})
```

## v-model

```ts
const list = defineModel({
  type: Array,
  default: () => [],
})
```

拖拽排序后自动更新数组顺序。

## 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 列表项内容，逐项渲染 |

## 行为说明

- 在 `onMounted` 中初始化 SortableJS 实例
- 拖拽结束后自动同步数组顺序到 `v-model`
- 通过 `options` 透传 SortableJS 的所有配置（如 `animation`、`handle`、`group` 等）
- 容器元素需要有子元素作为拖拽项

## 示例

```vue
<script setup lang="ts">
const list = ref([
  { id: 1, name: '项目一' },
  { id: 2, name: '项目二' },
  { id: 3, name: '项目三' },
])
</script>

<template>
  <QlDraggable
    v-model="list"
    :options="{ animation: 200, handle: '.drag-handle' }"
  >
    <div v-for="item in list" :key="item.id" class="drag-item">
      <span class="drag-handle">⋮⋮</span>
      <span>{{ item.name }}</span>
    </div>
  </QlDraggable>
</template>
```

## 与直接使用 SortableJS 的差异

- 自动处理 `onUpdate` 回调，同步数组顺序
- 自动管理 SortableJS 实例的生命周期
- `options` 透传，支持 SortableJS 所有原生配置
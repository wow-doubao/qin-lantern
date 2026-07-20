# QlTable

基于 ElTable 的增强表格组件，支持动态表头、树形列配置、插槽系统、多选功能。

## Props

```ts
interface TableLabelChild {
  label: string       // 列标题
  prop: string        // 字段名
  show?: boolean      // 是否显示（false 时隐藏该列）
  slot?: boolean      // 是否使用插槽渲染
  child?: TableLabelChild[]  // 子列（多级表头）
}

interface TableLabel extends Partial<TableColumnInstance['$props']> {
  label: string
  prop: string
  show?: boolean
  slot?: boolean
  child?: TableLabelChild[]
}

// 组件 Props
defineProps<{
  label: TableLabel[]       // 表头配置
  data: T[]                 // 表格数据
  select?: boolean          // 是否显示多选列
  popover?: boolean         // 是否显示动态表头控制（Popover + Tree）
}>()
```

- `label`: 支持 `ElTableColumn` 的所有属性（如 `width`、`align`、`fixed` 等），通过 `v-bind` 透传
- `data`: 泛型约束 `T extends Record<string, any>`
- `select`: 为 true 时显示 selection 列，通过 `v-model:selectData` 双向绑定选中数据
- `popover`: 为 true 时显示操作按钮，点击弹出树形控件让用户自定义显示/隐藏列

## v-model / Events

```ts
// 多选数据双向绑定
const selectionData = defineModel<Record<string, any>[]>('selectData', {
  type: Array,
  default: () => [],
})
```

## 插槽系统

QlTable 支持动态插槽。在 `label` 配置中设置 `slot: true` 的列，通过具名插槽自定义渲染：

```vue
<QlTable :label="label" :data="tableData">
  <template #status="{ row }">
    <el-tag :type="row.status === 1 ? 'success' : 'danger'">
      {{ row.status === 1 ? '启用' : '禁用' }}
    </el-tag>
  </template>
  <template #action="{ row }">
    <el-button @click="handleEdit(row)">编辑</el-button>
  </template>
</QlTable>
```

插槽名称为 `label` 配置中 `prop` 的值，插槽 props 包含 `{ row, column, $index }`。

## Expose 方法

```ts
// 从外部删除选中项
deleteSelect(row: any): void
```

## 完整示例

```vue
<script setup lang="ts">
import type { TableLabel } from 'qin-lantern'

const label: TableLabel[] = [
  { label: '姓名', prop: 'name', width: 120 },
  { label: '年龄', prop: 'age', width: 80 },
  {
    label: '联系方式',
    prop: 'contact',
    child: [
      { label: '手机号', prop: 'phone', width: 140 },
      { label: '邮箱', prop: 'email', width: 200 },
    ],
  },
  { label: '状态', prop: 'status', slot: true, width: 100 },
  { label: '操作', prop: 'action', slot: true, width: 150, fixed: 'right' },
]

const tableData = ref([
  { id: 1, name: '张三', age: 28, phone: '13800138000', email: 'zhangsan@example.com', status: 1 },
  { id: 2, name: '李四', age: 32, phone: '13900139000', email: 'lisi@example.com', status: 0 },
])

const selectData = ref<Record<string, any>[]>([])

function handleEdit(row: any) {
  // 编辑逻辑
}
</script>

<template>
  <QlTable
    v-model:select-data="selectData"
    :label="label"
    :data="tableData"
    :select="true"
    :popover="true"
  >
    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
    </template>
  </QlTable>
</template>
```

## 与 Element Plus 的差异

- **动态表头**：通过 `popover` + `ElTree` 让用户自定义列的显示/隐藏，状态保存在 `label` 配置的 `show` 字段
- **插槽系统**：不再需要手动为每列写 `<ElTableColumn>`，通过 `slot: true` + 具名插槽统一管理
- **多选**：`v-model:selectData` 替代手动管理 `selection-change` 事件，支持跨页保持选中状态
- **移动端**：移动端自动取消 `fixed` 列固定，避免布局问题
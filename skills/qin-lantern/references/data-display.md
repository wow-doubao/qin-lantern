# QlCard / QlImage / QlSpace / QlPagination / QlPaging / QlPlusMinus

## QlCard

卡片容器，基于 ElCard 封装，提供 header/search/footer 三个插槽区域。

### 插槽

| 插槽名 | 说明 |
|--------|------|
| `header` | 卡片头部 |
| `search` | 搜索区域（位于主体内容上方） |
| `default` | 主体内容 |
| `footer` | 卡片底部 |

### 示例

```vue
<QlCard>
  <template #header>
    <span>用户管理</span>
  </template>
  <template #search>
    <el-input v-model="keyword" placeholder="搜索" />
  </template>
  <QlTable :label="label" :data="tableData" />
  <template #footer>
    <el-button>取消</el-button>
    <el-button type="primary">保存</el-button>
  </template>
</QlCard>
```

默认 `shadow="hover"`，内部使用 `QlSpace`（垂直方向、左对齐、大间距）包裹内容。

---

## QlImage

基于 ElImage 的图片展示组件，简化了常用配置。

### Props

```ts
defineProps({
  width: {
    type: [String, Number],
    default: 100,          // 图片宽度（px）
  },
  height: {
    type: [String, Number],
    default: 100,          // 图片高度（px）
  },
  src: {
    type: String,
    default: '',           // 图片地址
  },
})
```

### 行为说明

- 当 `src` 为空时，不渲染任何内容
- 默认 `fit="cover"`，`preview-teleported` 启用
- 自动支持点击预览

### 示例

```vue
<QlImage :src="imageUrl" :width="200" :height="150" />
```

---

## QlSpace

垂直间距布局组件，基于 ElSpace 封装。

### 行为说明

- 固定 `direction="vertical"`、`alignment="flex-start"`、`size="large"`
- 适合表单、卡片内部等需要垂直排列的场景

### 示例

```vue
<QlSpace>
  <div>第一行内容</div>
  <div>第二行内容</div>
</QlSpace>
```

---

## QlPagination

基于 ElPagination 的分页器，自动滚动到页面顶部。

### Props

```ts
defineProps({
  autoScroll: {
    type: Boolean,
    default: true,         // 翻页后是否自动滚动到顶部
  },
  scrollEl: {
    type: String,
    default: 'main',       // 滚动目标元素选择器
  },
})
```

### Events

```ts
const emit = defineEmits(['change'])  // 翻页变化时触发
```

### 行为说明

- 移动端自动切换为简洁模式：`size="small"`、`background`、`layout="prev, pager, next"`
- 桌面端使用 ElPagination 的完整布局
- 翻页后自动滚动到 `scrollEl` 选择器元素的顶部
- 支持 ElPagination 的所有透传 props（通过 `v-bind="$attrs"` 传递）

### 示例

```vue
<script setup lang="ts">
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

function handlePageChange() {
  fetchData(currentPage.value, pageSize.value)
}
</script>

<template>
  <QlPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @change="handlePageChange"
  />
</template>
```

---

## QlPaging

触底加载/无限滚动组件，基于 ElScrollbar 实现。

### Props

```ts
defineProps({
  auto: {
    type: Boolean,
    default: true,               // 是否自动加载首屏数据
  },
  defaultPageNo: {
    type: [String, Number],
    default: 1,                  // 起始页码
  },
  defaultPageSize: {
    type: [String, Number],
    default: 10,                 // 每页条数
  },
  useChatRecordMode: {
    type: Boolean,
    default: false,              // 聊天记录模式（从底部加载，滚动位置固定）
  },
  chatMobile: {
    type: Boolean,
    default: false,              // 聊天记录模式下的移动端适配
  },
})
```

### Events

```ts
const emit = defineEmits<{
  query: [page: number, limit: number]  // 触发加载，参数为当前页码和每页条数
}>()
```

### v-model

```ts
const listData = defineModel({
  type: Array,
  default: () => [],
})
```

### Expose 方法

```ts
// 完成加载，将数据追加到列表
complete(data: any[]): Promise<void>

// 重新加载（清空数据，重置页码）
reload(): void

// 聊天记录模式下在顶部添加新消息
addChatRecordData(data: any): Promise<void>

// 回到顶部
backTop(): Promise<void>

// 获取容器高度信息
getHeight(): Promise<{ visualHeight: number, contentHeight: number }>
```

### 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 列表项内容 |
| `empty` | 空数据占位 |
| `loading` | 自定义加载中样式 |

### 行为说明

- 滚动到底部自动触发 `query` 事件加载下一页
- 数据不足一页时自动继续请求直到铺满
- 无更多数据时停止触发加载
- 聊天记录模式：滚动到顶部加载历史消息，自动保持滚动位置

### 基本示例

```vue
<script setup lang="ts">
const list = ref<any[]>([])
const pagingRef = ref()

function handleQuery(page: number, limit: number) {
  fetch(`/api/list?page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(data => pagingRef.value?.complete(data))
}
</script>

<template>
  <QlPaging
    ref="pagingRef"
    v-model="list"
    :default-page-size="20"
    @query="handleQuery"
  >
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
  </QlPaging>
</template>
```

### 聊天记录模式示例

```vue
<QlPaging
  ref="pagingRef"
  v-model="messages"
  :use-chat-record-mode="true"
  :auto="false"
  style="height: 500px"
  @query="handleQuery"
>
  <div v-for="msg in messages" :key="msg.id">
    {{ msg.content }}
  </div>
</QlPaging>
```

---

## QlPlusMinus

动态增减项组件，通过 `+/-` 按钮管理数组数据。

### Props

```ts
defineProps({
  options: {
    type: Object,
    default: () => ({}),   // 新增项的默认配置模板（使用 cloneDeep 深拷贝）
  },
  max: {
    type: Number,
    default: null,         // 最大条目数
  },
})
```

### Events

```ts
const emit = defineEmits<{
  plus: []                     // 新增项时触发
  minus: [value: any[]]        // 删除项时触发，参数为被删除的数据
}>()
```

### v-model

```ts
const arr = defineModel({
  type: Array,
  required: true,
  default: () => [],
})
```

### 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 每条数据的渲染，slot props: `{ data, index }` |

### 行为说明

- 最后一项显示 `+` 按钮，点击后深拷贝 `options` 追加到数组末尾
- 多于一项时每项显示 `-` 按钮
- 达到 `max` 上限时隐藏 `+` 按钮

### 示例

```vue
<QlPlusMinus
  v-model="items"
  :options="{ name: '', price: 0 }"
  :max="10"
  @plus="() => console.log('新增')"
  @minus="(data) => console.log('删除', data)"
>
  <template #default="{ data, index }">
    <el-input v-model="data.name" placeholder="商品名" />
    <el-input-number v-model="data.price" placeholder="价格" />
  </template>
</QlPlusMinus>
```
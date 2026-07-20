# Composables

## useDialog

弹窗开关 hook，提供 `show` 状态和 AOP 包装函数。

### 签名

```ts
export const useDialog = (): {
  show: Ref<boolean>
  AOP: (fn: (...args: any[]) => Promise<unknown> | unknown) =>
    (...args: any[]) => Promise<unknown>
}
```

### 行为说明

- `show`: 控制弹窗显示/隐藏的双向绑定值
- `AOP(fn)`: 包装一个函数，执行后自动切换 `show` 状态（true → false 或 false → true）
  - 调用 `AOP(fn)` 返回的包装函数时，先执行 `fn` 的返回值（支持 async），然后切换 `show`

### 使用场景

适用于弹窗中有操作按钮需要在操作完成后关闭弹窗的场景：

```vue
<script setup lang="ts">
const { show, AOP } = useDialog()

// 确认按钮的回调
const handleConfirm = AOP(async (formData) => {
  await submitForm(formData)  // 提交完成后自动关闭弹窗
})
</script>

<template>
  <el-button @click="show = true">打开</el-button>
  <QlDialog v-model="show" :confirm="handleConfirm" />
</template>
```

---

## useExpose

自动代理模板 ref 上的全部属性到组件的 `expose`。

### 签名

```ts
export function useExpose<T>(
  targetRef: Ref<T | null>,
  extra?: Record<string, any>,
): void
```

### 行为说明

- 利用 Proxy 懒求值，自动将 `targetRef` 上的所有方法/属性代理到 `expose`
- `extra` 参数可额外暴露自定义方法，同名时覆盖 ref 上的属性
- 子组件新增方法自动继承，无需手动维护 `defineExpose`

### 使用场景

在封装组件时，需要将内部子组件的所有方法暴露给父组件：

```vue
<script setup>
import { ElForm } from 'element-plus'

const formRef = ref<typeof ElForm>()

// 将 ElForm 的所有方法（validate、resetFields 等）暴露给父组件
// 同时额外暴露 isHide 方法
useExpose(formRef, { isHide })
</script>

<template>
  <ElForm ref="formRef">
    <!-- ... -->
  </ElForm>
</template>
```

---

## ~~useRequest~~ [已废弃]

> 推荐使用 [alova](https://alova.js.org/) 的 `useRequest` 替代。

原用途：包装异步请求，自动管理 loading 状态。

```ts
// 原 API
const { loading, send } = useRequest(requestFn)
```

### 迁移方案

```ts
// 旧代码
const { loading, send } = useRequest(fetchData)

// 新代码（alova）
const { loading, send } = useRequest(fetchData)
```

---

## ~~useTable~~ [已废弃]

> 推荐使用 [alova](https://alova.js.org/) 的 `usePagination` 替代。

原用途：管理分页列表的 loading、分页参数、搜索。

```ts
// 原 API
const { loading, list, total, currentPage, perPage, search, loadList } = useTable(listRequestFn, options)
```

### 迁移方案

```ts
// 旧代码
const { loading, list, total, currentPage, perPage, search } = useTable(fetchList, {
  page: 1,
  limit: 10,
})

// 新代码（alova usePagination）
const { loading, data, page, pageSize, total, send } = usePagination(
  (page, pageSize) => fetchList({ page, pageSize }),
  { initialPage: 1, initialPageSize: 10 }
)
```
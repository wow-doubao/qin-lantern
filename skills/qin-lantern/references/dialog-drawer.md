# QlDialog / QlDrawer

基于 ElDialog 和 ElDrawer 的弹窗/抽屉组件，提供确认/取消按钮、loading 态、移动端全屏适配。

## 共同 Props

两个组件 Props 完全一致：

```ts
defineProps({
  footer: {
    type: Boolean,
    default: true,         // 是否显示底部按钮
  },
  sureText: {
    type: String,
    default: '',           // 确认按钮文字（空时使用 i18n 默认值）
  },
  cancelText: {
    type: String,
    default: '',           // 取消按钮文字（空时使用 i18n 默认值）
  },
  confirm: {
    type: Function,
    default: () => Promise.resolve(),  // 确认回调，返回 Promise 自动管理 loading
  },
})
```

## v-model

```ts
// 双向绑定显示/隐藏
const visible = defineModel({
  type: Boolean,
  default: false,
})
```

## 插槽

| 插槽名 | 说明 |
|--------|------|
| `header` | 自定义头部 |
| `default` | 主体内容 |
| （footer 由 `footer` prop 控制） | |

## 行为说明

- **确认按钮**：点击后调用 `confirm` 函数，自动进入 loading 态，Promise resolve/reject 后自动关闭 loading
- **取消按钮**：点击后关闭弹窗/抽屉
- **移动端适配**：屏幕宽度 < 768px 时，QlDialog 自动全屏，QlDrawer 自动变为 100% 宽度
- **默认不可点击遮罩关闭**：`close-on-click-modal` 和 `close-on-press-escape` 均为 false

## QlDialog 示例

```vue
<script setup lang="ts">
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

async function handleConfirm() {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 2000))
  ElMessage.success('操作成功')
}
</script>

<template>
  <el-button @click="dialogVisible = true">打开弹窗</el-button>

  <QlDialog
    v-model="dialogVisible"
    title="编辑用户"
    sure-text="保存"
    :confirm="handleConfirm"
  >
    <el-form :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </QlDialog>
</template>
```

## QlDrawer 示例

```vue
<script setup lang="ts">
const drawerVisible = ref(false)

async function handleDrawerConfirm() {
  await submitForm()
  drawerVisible.value = false
}
</script>

<template>
  <el-button @click="drawerVisible = true">打开抽屉</el-button>

  <QlDrawer
    v-model="drawerVisible"
    title="详情"
    sure-text="提交"
    :confirm="handleDrawerConfirm"
  >
    <template #header>
      <span style="font-weight: bold">用户详情</span>
    </template>
    <!-- 抽屉内容 -->
  </QlDrawer>
</template>
```

## 与 Element Plus 的差异

- 内置确认/取消按钮和 loading 管理，无需手动 `<template #footer>`
- 移动端自动全屏，无需手动判断 `fullscreen`/`size`
- 默认禁止点击遮罩和 ESC 关闭，防止误操作
- 支持 `sureText`/`cancelText` 自定义按钮文字，也支持 i18n
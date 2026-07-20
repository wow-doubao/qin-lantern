# QlFormList

动态表单列表组件，通过配置数组驱动表单渲染，支持 14 种表单类型、响应式栅格布局、显隐控制、校验规则。

## 类型定义

```ts
interface Col {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

interface FormListOption {
  label?: string             // 表单项标签
  key?: string               // 表单字段名（绑定到 formData 的 key）
  type: 'show' | 'txt' | 'input' | 'inputNumber' | 'radioGroup'
    | 'checkboxGroup' | 'switch' | 'autocomplete' | 'select'
    | 'cascader' | 'datePicker' | 'upload' | 'slot' | 'extendSlot'
  hidden?: boolean           // 是否隐藏
  bind?: Record<string, any> // 透传到内部组件的 props
  on?: Record<string, (...args: any[]) => any>  // 透传到内部组件的事件
  rule?: FormItemRule[]      // 校验规则
  options?: Record<string, any>[]  // select/radio/checkbox 的选项
  col?: number | Col         // 栅格宽度（默认移动优先断点：xs=24, sm=12, md=8, lg=6, xl=4）
}

type FormListOptions = FormListOption[]
```

## Props

```ts
defineProps<{
  options: FormListOptions          // 表单配置数组
  col?: Record<string, number>      // 全局栅格配置（覆盖默认值）
}>()
```

## v-model

```ts
const formData = defineModel<Record<string, any>>({ default: () => ({}) })
```

## 插槽

| 插槽名 | 说明 |
|--------|------|
| 动态插槽（`type === 'slot'`） | 以 `key` 为插槽名，完全自定义渲染 |
| 动态插槽（`type === 'extendSlot'`） | 以 `key` 为插槽名，自定义渲染但不包裹 ElFormItem |
| `default` | 追加到表单末尾的额外内容 |

## Expose 方法

```ts
// 动态控制表单项显隐
isHide(data: string | string[], flag: boolean): void

// 此外通过 useExpose 暴露了 ElForm 实例的所有方法（validate、resetFields 等）
```

## 表单类型说明

| type | 内部组件 | 说明 |
|------|---------|------|
| `show` | - | 展开/收起切换按钮，配合 `hidden` 控制高级选项 |
| `txt` | - | 纯文本标题 |
| `input` | ElInput | 文本输入框 |
| `inputNumber` | ElInputNumber | 数字输入框 |
| `radioGroup` | ElRadioGroup | 单选组，通过 `options` 配置选项 |
| `checkboxGroup` | ElCheckboxGroup | 多选组，通过 `options` 配置选项 |
| `switch` | ElSwitch | 开关 |
| `autocomplete` | ElAutocomplete | 远程搜索输入框 |
| `select` | ElSelect | 下拉选择器，通过 `options` 配置选项 |
| `cascader` | ElCascader | 级联选择器 |
| `datePicker` | ElDatePicker | 日期选择器 |
| `upload` | QlUpload | 图片上传 |
| `slot` | 自定义插槽 | 通过 `key` 对应的具名插槽渲染，包裹在 ElFormItem 内 |
| `extendSlot` | 自定义插槽 | 通过 `key` 对应的具名插槽渲染，不包裹 ElFormItem |

## 栅格系统

默认采用移动优先响应式断点，从左到右优先级递增：

```ts
// 默认值
{ xs: 24, sm: 12, md: 8, lg: 6, xl: 4 }

// 自定义全局 col
<QlFormList :options="formOptions" :col="{ xs: 24, sm: 24, md: 12, lg: 8, xl: 6 }" />

// 单列自定义 col
{ type: 'input', key: 'name', label: '姓名', col: 12 }
// 等价于 { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
```

## 完整示例

```vue
<script setup lang="ts">
import type { FormListOptions } from 'qin-lantern'

const formData = ref({
  name: '',
  age: null,
  gender: 'male',
  hobbies: [],
  province: '',
  birthDate: '',
  avatar: '',
  enable: true,
})

const formOptions: FormListOptions = [
  { type: 'input', key: 'name', label: '姓名', rule: [{ required: true, message: '请输入姓名' }] },
  { type: 'inputNumber', key: 'age', label: '年龄', bind: { min: 0, max: 150 } },
  {
    type: 'radioGroup',
    key: 'gender',
    label: '性别',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    type: 'checkboxGroup',
    key: 'hobbies',
    label: '爱好',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
    ],
  },
  {
    type: 'select',
    key: 'province',
    label: '省份',
    options: [
      { label: '广东', value: 'guangdong' },
      { label: '北京', value: 'beijing' },
    ],
  },
  { type: 'datePicker', key: 'birthDate', label: '出生日期' },
  { type: 'switch', key: 'enable', label: '启用' },
  { type: 'show' },
  { type: 'upload', key: 'avatar', label: '头像', hidden: true },
]

const formRef = ref()

async function handleSubmit() {
  const valid = await formRef.value?.validate()
  if (valid) {
    console.log('表单数据', formData.value)
  }
}
</script>

<template>
  <QlFormList
    ref="formRef"
    v-model="formData"
    :options="formOptions"
  />
  <el-button @click="handleSubmit">提交</el-button>
</template>
```

## 与 Element Plus 的差异

- 完全配置驱动，无需手写大量 `ElFormItem` 模板
- 内置展开/收起功能（`show` 类型），配合 `hidden` 属性实现高级选项折叠
- 移动优先响应式栅格，自动适配不同屏幕尺寸
- `bind`/`on` 透传机制，可灵活定制内部组件的行为
- `isHide` 方法支持动态控制表单项显隐
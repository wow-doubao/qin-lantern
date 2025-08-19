# Dialog 对话框

封装 `useDialog` Hook，使用该函数可以方便的调用对话框。
> import { useDialog } from 'qin-lantern'

当页面尺寸小于 **md** 时，会自动全屏对话框。
<script setup>
import Dialog from '@/examples/dialog.vue'
</script>

::: raw
<Dialog />
:::

<<< @/examples/dialog.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 弹框展示 | `boolean` | false |
| footer | 是否展示footer | `boolean` | true |
| sureText | 确认按钮文字 | `string` | 确认 |
| cancelText | 取消按钮文字 | `string` | 取消 |
| confirm | 确认按钮事件 | `Function` | () => Promise.resolve() |

[Other Attributes](https://element-plus.org/zh-CN/component/dialog.html#attributes)

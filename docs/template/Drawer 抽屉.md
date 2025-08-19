# Drawer 抽屉

封装了 `useDialog` Hook，使用该函数可以方便的调用抽屉。
> import { useDialog } from 'qin-lantern'

当页面尺寸小于 **md** 时，会自动全屏抽屉。
<script setup>
import Drawer from '@/examples/drawer.vue'
</script>

::: raw
<Drawer />
:::

<<< @/examples/drawer.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 抽屉展示 | `boolean` | false |
| footer | 是否展示footer | `boolean` | true |
| sureText | 确认按钮文字 | `string` | 确认 |
| cancelText | 取消按钮文字 | `string` | 取消 |
| confirm | 确认按钮事件 | `Function` | () => Promise.resolve() |

[Other Attributes](https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7)

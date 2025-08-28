# PlusMinus 增减
通过插槽获取循环的内容 **#default="{data, index}"**
<script setup>
import PlusMinus from '@/examples/plusMinus.vue'
</script>

::: raw
<PlusMinus />
:::

<<< @/examples/plusMinus.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 循环展示的数据 | `array` | [] |
| options | 需要增加的对象 | `object` | {} |
| max | 可增加的最多数量 | `number` | - |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| plus | 添加数据时触发 | () => void |
| minus | 删除数据时触发，返回除的数据 | (data: any[]) => void |

# Table 表格
建议使用alova `usePagination` Hook，简化表格操作。
<script setup>
import Table from '@/examples/table.vue'
</script>

::: raw
<Table />
:::

<<< @/examples/table.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| label | 对标头项控制 | [TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)`&{slot?: boolean, show?: boolean}` |- |
| select | 是否展示select | boolean | false |
| popover | 是否展示动态表头 | boolean | false |
| v-model:selectData | select数据 | array | [] |

### Exposes
| 名称 | 说明 | 类型 |
| --- | --- | --- |
| deleteSelect | 删除select选项 | `(row: any) => void` |

[Attributes](https://element-plus.org/zh-CN/component/space.html#attributes)

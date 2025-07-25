# Pagination 分页
当页面尺寸小于 **md** 时，会显示小组件。
<script setup>
  import Pagination from '@/examples/pagination.vue'
</script>

::: raw
<Pagination />
:::

<<< @/examples/pagination.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| autoScroll | 分页改变时滚动到顶部 | `boolean` | true |
| scrollEl | 滚动盒子 | `string` | .el-main |

[Other Attributes](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)

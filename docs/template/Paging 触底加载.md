# Paging 触底加载
兼容触底加载和聊天模式加载
<script setup>
import Paging from '@/examples/paging.vue'
</script>

::: raw
<Paging />
:::

<<< @/examples/paging.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 列表数据 | `any[]` | [] |
| auto | 页面打开时自动加载 | `boolean` | true |
| defaultPageNo | query触发时默认pageNo | `number`&#124;`string` | 1 |
| defaultPageSize | query触发时默认pageSize | `number`&#124;`string` | 10 |
| useChatRecordMode | 聊天模式 | `boolean` | false |
| chatMobile | 聊天模式移动端兼容 | `boolean` | false |
> 聊天模式移动端兼容是将整个区域上下颠倒来获取良好体验

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| query | 加载时触发 | (page: number, limit: number) => void |

### Slots
| 插槽名 |	说明 |
| --- | --- |
| default |	自定义默认内容 |
| loading |	自定义loading |
| empty |	自定义空数据占位 |

### Exposes
| 名称 | 说明 | 类型 |
| --- | --- | --- |
| complete | 获取到的数据使用此方法添加 | `(data: any[]) => Promise<void>` |
| reload | 重置列表 | `() => void` |
| addChatRecordData | 添加聊天记录 | `(data: any[]) => Promise<void>` |
| backTop | 回到顶部 | `() => Promise<void>` |
| getHeight | 获取高度 | `() => Promise<{visualHeight: number; contentHeight: number;}>` 可视区域高度, 内容高度 |

[Attributes](https://element-plus.org/zh-CN/component/scrollbar.html#attributes)
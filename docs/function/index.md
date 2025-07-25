## alova

[alova](https://alova.js.org/zh-CN/tutorial/getting-started/introduce)完美兼容你最喜欢的HTTP client和UI框架，快速开发客户端和服务的应用的业务逻辑，同时让API信息与代码进行交互，像虫洞一样拉近后端协作距离，极致高效地集成你的APIs

## useDialog()

对弹框类组件调用封装Hook

```vue
<script setup lang="ts">
  import { useDialog } from 'qin-lantern'

  // 弹框Hook
  const { show, AOP } = useDialog()

  // 打开弹框
  const open = AOP((data) => {
    console.log(data) // 打开弹框时传递的数据
  })

  // 关闭弹框
  const confirm = AOP(async () => {
    const data = await timedelay('我是弹框确认返回的数据')
    console.log(data)
  })
</script>
```
[详情](/template/Dialog%20%E5%AF%B9%E8%AF%9D%E6%A1%86.html)

## useRequest() <Badge type="danger" text="废弃" />

对请求封装Hook
```vue
<script setup lang="ts">
  import { useRequest } from 'qin-lantern'

  // 请求Hook
  const {loading, send} = useRequest(request)

</script>
```

## useTable() <Badge type="danger" text="废弃" />

对表格封装Hook
```vue
<script setup lang="ts">
  import { useTable } from 'qin-lantern'

  // 列表数据
const {loading, list, total, page, limit, search, loadList} = useTable(async () => {
  list.value = await timedelay() // 模拟调用接口
  total.value = Math.ceil(Math.random() * 100) // 返回总条数
}, { 
  // 默认配置
  immediate?: true;
  page?: 1;
  limit?: 10;
})

</script>
```
# wizardUpload 导向上传

<script setup>
import wizardUpload from '@/examples/wizardUpload.vue'
</script>

::: raw
<wizardUpload />
:::

<<< @/examples/wizardUpload.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 文件地址 | `string[]` | [''] |
| action  | 请求 URL | `string` | # |
| headers | 设置上传的请求头部 | `object` | - |
| type | 上传类型 | image &#124; video &#124; file | image |
| max | 允许上传文件的最大数量 | `number` | - |
| size | 允许上传的文件大小(MB) | `number` | - |

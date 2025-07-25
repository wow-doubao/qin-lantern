# Upload 上传

<script setup>
import Upload from '@/examples/upload.vue'
</script>

::: raw
<Upload />
:::

<<< @/examples/upload.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 图片地址，多条逗号分割 | `string` | '' |
| disabled | 禁用上传 | `boolean` | false |
| limit | 允许上传文件的最大数量 | `number` | - |
| size | 允许上传的文件大小(MB) | `number` | - |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| success | 上传成功事件 | (data: string[]) => void |

### Exposes
| 名称 | 说明 | 类型 |
| --- | --- | --- |
| abort | 取消上传请求 | `(file: UploadFile) => void` |
| submit | 手动上传文件列表 | `() => void` |
| clearFiles | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | `(status?: UploadStatus[]) => void` |
| handleStart | 手动选择文件 | `(rawFile: UploadRawFile) => void` |
| handleRemove | 手动移除文件 | `(file: UploadFile `&#124;` UploadRawFile, rawFile?: UploadRawFile) => void` |

[Attributes](https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)
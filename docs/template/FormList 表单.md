# FormList 表单
<script setup>
import FormList from '@/examples/formList.vue'
</script>

::: raw
<FormList />
:::

<<< @/examples/formList.vue

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| v-model | 表单数据对象 | `Record<string, any>` | - |
| options | 表单配置项 | `FormListOptions` | [] |
| [col](https://element-plus.org/zh-CN/component/layout.html#col-attributes) | 布局分栏 | `object` | `{xs: 24, sm: 12, md: 8, lg: 6, xl: 4}` |

### Exposes
| 名称 | 说明 | 类型 |
| --- | --- | --- |
| validate | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise | `(callback?: FormValidateCallback) => Promise<void>` |
| validateField | 验证具体的某个字段。 | `(props?: Arrayable<FormItemProp> `&#124;` undefined, callback?: FormValidateCallback `&#124;` undefined) => FormValidationResult` |
| resetFields | 重置该表单项，将其值重置为初始值，并移除校验结果 | `(props?: Arrayable<FormItemProp>`&#124;`undefined) => void` |
| scrollToField | 滚动到指定的字段 | `(prop: FormItemProp) => void` |
| clearValidate | 清理某个字段的表单验证信息 | `(props?: Arrayable<FormItemProp>` &#124; `undefined) => void` |
| isHide | 隐藏显示配置项 | `(data: string, flag: boolean) => Promise<void>` |

[Other Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes)

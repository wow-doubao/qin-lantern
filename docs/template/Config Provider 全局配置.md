# Config Provider 全局配置

``` vue
<template>
  <ql-config-provider>
    ...
  </ql-config-provider>
</template>
```
`qlLocale` 属性用于全局国际化配置，组件自带 **中（默认）、英** 两个语言包，也可扩展其他语言包。
>  import { zhCn, en } from 'qin-lantern/locale'

#### 国际化配置示例：

<<< ../../packages/qin-lantern/src/locale/lang/zh-cn.ts

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认 |
| --- | --- | --- | --- |
| qlLocale | 全局国际化配置，默认使用中文 | `object` | - |
| [qlUpload](https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7) | 文件上传配置 | `object` | - |

[Attributes](https://element-plus.org/zh-CN/component/config-provider.html#config-provider-attributes)

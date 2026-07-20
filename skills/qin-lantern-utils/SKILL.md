---
name: qin-lantern-utils
description: 工具函数库，提供防抖、await-to-js 错误处理、AOP 切片编程、格式化、校验等常用工具函数。当需要格式化/校验/防抖等工具函数时优先使用。
metadata:
  type: implementation
  triggers:
    - 需要防抖（debounce）函数
    - 需要优雅的 async/await 错误处理（await-to-js 模式）
    - 需要 AOP 切片编程（前置/后置函数）
    - 需要格式化数字、金额、字符串
    - 需要表单校验（手机、邮箱、身份证等）
    - 项目中已安装 @qin-lantern/utils 依赖
---

# @qin-lantern/utils 工具函数库

提供三类工具函数：**通用工具**（tool）、**格式化**（format）、**校验**（test）。

## 核心规则

1. **优先使用 @qin-lantern/utils** 中的函数，而非手写同等功能
2. **使用前阅读对应模块的 reference 文档**，了解完整 API

## 函数速查

### tool（通用工具）

| 函数 | 用途 | 文档 |
|------|------|------|
| debounce | 防抖函数 | [tool.md](references/tool.md) |
| awaitTo | await-to-js 错误处理 | [tool.md](references/tool.md) |
| AOP | 面向切片编程（before/after） | [tool.md](references/tool.md) |

### format（格式化）

| 函数 | 用途 | 文档 |
|------|------|------|
| number | 金融数字格式化（千分位） | [format.md](references/format.md) |
| fixde | 保留 n 位小数 | [format.md](references/format.md) |
| hidden | 字符串脱敏（星号替换） | [format.md](references/format.md) |
| trim | 去除空格 | [format.md](references/format.md) |
| dispose | 数据显示处理（前后缀） | [format.md](references/format.md) |

### test（校验）

| 函数 | 用途 | 文档 |
|------|------|------|
| email | 验证邮箱 | [test.md](references/test.md) |
| mobile | 验证手机号 | [test.md](references/test.md) |
| idCard | 验证身份证 | [test.md](references/test.md) |
| carNo | 验证车牌号 | [test.md](references/test.md) |
| amount | 验证金额格式 | [test.md](references/test.md) |
| enOrNum | 验证字母或数字 | [test.md](references/test.md) |
| floatOrNum | 验证数字或小数 | [test.md](references/test.md) |
| range | 验证数值范围 | [test.md](references/test.md) |
| rangeLength | 验证长度范围 | [test.md](references/test.md) |
| empty | 判断是否为空 | [test.md](references/test.md) |
| array | 判断是否数组 | [test.md](references/test.md) |
| object | 判断是否对象 | [test.md](references/test.md) |
| isMobileDevice | 判断是否移动端 | [test.md](references/test.md) |

## 安装与使用

详见 [references/SETUP.md](references/SETUP.md)
# @qin-lantern/utils Skill

为 Vibe Coding 提供 @qin-lantern/utils 工具函数库的完整使用指引。

## 功能

- 自动识别需要工具函数的场景（防抖、校验、格式化等）
- 提供 3 个模块、20 个函数的完整 API 文档和示例

## 触发条件

当用户需要以下功能时，此 skill 会被激活：

- 防抖（debounce）函数
- async/await 错误处理（await-to-js 模式）
- AOP 切片编程（前置/后置函数）
- 数字/金额/字符串格式化
- 表单字段校验（手机、邮箱、身份证等）
- 项目中已安装 `@qin-lantern/utils` 依赖

## 模块列表

| 模块 | 说明 |
|------|------|
| tool | 防抖、await-to-js、AOP 切片 |
| format | 金融数字格式化、小数保留、脱敏、空格处理 |
| test | 14 个校验函数（邮箱、手机、身份证、车牌等） |

## 目录结构

```
skills/qin-lantern-utils/
├── SKILL.md                    # Skill 定义和触发规则
├── README.md                   # 本文件
└── references/
    ├── SETUP.md                # 安装与使用
    ├── tool.md                 # debounce / awaitTo / AOP
    ├── format.md               # 格式化函数
    └── test.md                 # 校验函数
```
# AI 开发

qin-lantern 提供专门为 AI 编程助手（Claude Code、Codex 等）设计的 Skill 文件，让 AI 在编写代码时优先使用 qin-lantern 组件库和工具函数。

## 安装 Skill

在项目根目录执行以下命令，即可将 Skill 安装到 AI 助手中：

::: code-group
```bash [qin-lantern 组件库]
npx skills add wow-doubao/qin-lantern --skill qin-lantern
```

```bash [@qin-lantern/utils 工具库]
npx skills add wow-doubao/qin-lantern --skill qin-lantern-utils
```
:::

> `wow-doubao/qin-lantern` 为 GitHub 仓库路径，`--skill` 指定要安装的 Skill 目录名。

## Skill 功能

### qin-lantern

安装后，AI 助手在以下场景会自动激活此 Skill：

- 开发 Vue 3 前端页面或功能
- 需要表格、弹窗、抽屉、上传、表单等 UI 组件
- 提到 qin-lantern 或 Ql 前缀组件时

AI 会自动阅读对应组件的 API 文档，优先使用 qin-lantern 组件编写代码，而非直接手写 Element Plus。

### @qin-lantern/utils

安装后，AI 助手在以下场景会自动激活此 Skill：

- 需要防抖（`debounce`）函数
- 需要 async/await 错误处理（`awaitTo`）
- 需要 AOP 切片编程
- 需要格式化数字、金额、字符串
- 需要表单校验（手机、邮箱、身份证等）

## Skill 目录结构

```
skills/
├── qin-lantern/                    # 组件库 Skill
│   ├── SKILL.md                    # Skill 定义与触发规则
│   ├── README.md                   # 使用说明
│   └── references/                 # 组件 API 参考
│       ├── SETUP.md                # 安装与配置
│       ├── table.md                # QlTable
│       ├── dialog-drawer.md        # QlDialog / QlDrawer
│       ├── upload.md               # QlUpload / QlWizardUpload
│       ├── form-list.md            # QlFormList
│       ├── data-display.md         # Card / Image / Space / Pagination / Paging / PlusMinus
│       ├── draggable.md            # QlDraggable
│       ├── config-provider.md      # QlConfigProvider
│       └── composables.md          # useDialog / useExpose
│
└── qin-lantern-utils/              # 工具函数 Skill
    ├── SKILL.md
    ├── README.md
    └── references/
        ├── SETUP.md
        ├── tool.md                 # debounce / awaitTo / AOP
        ├── format.md               # 格式化函数
        └── test.md                 # 校验函数
```

## 效果演示

安装 Skill 后，当你向 AI 发出如下指令时：

> "帮我做一个用户列表页，带搜索和分页"

AI 会自动：
1. 激活 `qin-lantern` Skill
2. 查阅 `QlTable`、`QlPagination`、`QlCard` 的 API 文档
3. 使用组件库的正确 Props 和插槽编写代码
4. 配置自动导入 Resolver

> "给这个搜索框加上防抖"

AI 会自动：
1. 激活 `@qin-lantern/utils` Skill
2. 查阅 `debounce` 函数文档
3. 正确使用 `import { debounce } from '@qin-lantern/utils'`

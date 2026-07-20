# qin-lantern Skill

为 Vibe Coding 提供 qin-lantern 组件库的完整使用指引。

## 功能

- 自动识别需要使用 qin-lantern 组件的场景
- 提供 14 个组件的完整 API 文档和业务示例
- 包含安装配置、自动导入、命名空间、国际化等完整指引

## 触发条件

当用户执行以下操作时，此 skill 会被激活：

- 开发 Vue 3 前端页面或功能
- 需要表格、弹窗、抽屉、上传、表单等 UI 组件
- 明确提到 qin-lantern 或 Ql 前缀组件
- 项目中已安装 `qin-lantern` 依赖

## 组件列表

| 组件 | 说明 |
|------|------|
| QlTable | 增强表格，支持动态表头、树形列、插槽系统、多选 |
| QlDialog | 确认弹窗，带 loading 态和移动端全屏适配 |
| QlDrawer | 抽屉面板，带确认/取消和 loading 态 |
| QlUpload | 图片上传，支持预览、大小/数量限制 |
| QlWizardUpload | 向导式多条目上传，支持图片/视频/文件 |
| QlFormList | 动态表单列表，支持 14 种表单类型 |
| QlDraggable | 拖拽排序容器 |
| QlCard | 卡片容器，带 header/search/footer 插槽 |
| QlImage | 图片展示，支持预览 |
| QlSpace | 垂直间距布局 |
| QlPagination | 分页器，自动滚动到顶部 |
| QlPaging | 触底加载/无限滚动 |
| QlPlusMinus | 动态增减项 |
| QlConfigProvider | 全局配置（命名空间、语言、上传） |

## 目录结构

```
skills/qin-lantern/
├── SKILL.md                        # Skill 定义和触发规则
├── README.md                       # 本文件
└── references/
    ├── SETUP.md                    # 安装与配置
    ├── table.md                    # QlTable
    ├── dialog-drawer.md            # QlDialog + QlDrawer
    ├── upload.md                   # QlUpload + QlWizardUpload
    ├── form-list.md                # QlFormList
    ├── data-display.md             # QlCard/QlImage/QlSpace/QlPagination/QlPaging/QlPlusMinus
    ├── draggable.md                # QlDraggable
    ├── config-provider.md          # QlConfigProvider
    └── composables.md              # useDialog/useExpose/废弃 composables
```
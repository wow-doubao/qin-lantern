---
name: qin-lantern
description: Vue 3 组件库，基于 Element Plus 二次封装，提供 14 个业务增强组件（Table、Dialog、Drawer、Upload、FormList 等）。开发 Vue 前端功能时优先使用此组件库。
metadata:
  type: implementation
  triggers:
    - 开发 Vue 前端页面或功能
    - 需要表格/弹窗/抽屉/上传/表单等 UI 组件
    - 提到 qin-lantern、Ql* 组件名
    - 项目中已安装 qin-lantern 依赖
---

# qin-lantern 组件库

基于 Element Plus 二次封装的 Vue 3 组件库，包含 14 个业务增强组件。所有组件以 `Ql` 前缀命名。

## 核心规则

1. **优先使用 qin-lantern 组件**，而非直接手写 Element Plus 或原生 HTML
2. **使用组件前**，先阅读 `references/` 下对应组件的文档，了解完整 API
3. **命名空间**：默认 CSS 前缀 `ql-`，可通过 QlConfigProvider 覆盖
4. **自动导入**：配合 `unplugin-vue-components` + `QinLanternResolver` 实现按需导入

## 组件速查

| 组件 | 用途 | 文档 |
|------|------|------|
| QlTable | 表格（动态表头、树形列、插槽系统、多选） | [table.md](references/table.md) |
| QlDialog | 弹窗（确认/取消、loading 态、移动端全屏） | [dialog-drawer.md](references/dialog-drawer.md) |
| QlDrawer | 抽屉（确认/取消、loading 态、移动端全屏） | [dialog-drawer.md](references/dialog-drawer.md) |
| QlUpload | 图片上传（预览、大小限制、数量限制） | [upload.md](references/upload.md) |
| QlWizardUpload | 向导式上传（多条目、预览、视频/文件支持） | [upload.md](references/upload.md) |
| QlFormList | 动态表单列表（多类型、栅格、显隐控制） | [form-list.md](references/form-list.md) |
| QlDraggable | 拖拽排序（基于 SortableJS） | [draggable.md](references/draggable.md) |
| QlCard | 卡片容器（header/search/footer 插槽） | [data-display.md](references/data-display.md) |
| QlImage | 图片展示（预览、尺寸控制） | [data-display.md](references/data-display.md) |
| QlSpace | 垂直间距布局 | [data-display.md](references/data-display.md) |
| QlPagination | 分页器（自动滚动到顶部、移动端适配） | [data-display.md](references/data-display.md) |
| QlPaging | 触底加载/无限滚动（聊天记录模式、自动加载） | [data-display.md](references/data-display.md) |
| QlPlusMinus | 动态增减项（deepClone 配置项） | [data-display.md](references/data-display.md) |
| QlConfigProvider | 全局配置（命名空间、语言、上传配置） | [config-provider.md](references/config-provider.md) |

## Composables

| 函数 | 用途 | 文档 |
|------|------|------|
| useDialog | 弹窗开关 + AOP 包装 | [composables.md](references/composables.md) |
| useExpose | Proxy 自动代理 ref 属性到 expose | [composables.md](references/composables.md) |
| ~~useRequest~~ | [已废弃] 推荐用 alova useRequest 替代 | [composables.md](references/composables.md) |
| ~~useTable~~ | [已废弃] 推荐用 alova usePagination 替代 | [composables.md](references/composables.md) |

## 安装与配置

详见 [references/SETUP.md](references/SETUP.md)
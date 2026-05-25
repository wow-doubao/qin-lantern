# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 注意
生成的文档使用中文，生成的代码需要添加中文注释

## Commands

```bash
# 安装依赖
pnpm install

# 构建组件库
pnpm ui:build

# 构建工具包
pnpm utils:build

# 启动文档开发服务器
pnpm docs:dev

# 构建文档
pnpm docs:build

# 组件库开发（Vite dev）
pnpm --filter qin-lantern dev

# 工具包开发（Rollup watch）
pnpm --filter utils dev

# Lint
pnpm lint
pnpm lint:fix
```

## Architecture

`pnpm` monorepo with 3 packages:

### `packages/qin-lantern` — 组件库（核心）
- Vue 3 组件库，基于 Element Plus 二次封装
- 组件以 `Ql` 前缀命名（如 `QlButton`, `QlTable`），通过 `withInstall()` 工具注册为 Vue 插件
- 通过 `unplugin-vue-components` 提供自动导入 Resolver（`QinLanternResolver`），匹配 `Ql` 前缀组件
- 构建: Vite + `vite-plugin-dts` 生成类型声明，`vue-tsc -b && vite build`
- 入口 `src/index.ts` 导出所有组件和 composables，同时暴露 `install()` 方法供 `app.use()`
- SCSS 采用 BEM 命名（`b`/`e`/`m`/`is` mixins），通过 `@use 'mixins/mixins'` 引入
- 命名空间前缀默认 `ql-`，可通过 `QlConfigProvider` + SCSS 变量覆盖（详见 docs/guide/命名空间.md）
- 支持 locale（`zhCn` / `en`），通过 `useLocale` hook 获取

### `packages/utils` — 工具函数库
- Rollup 构建，输出 CommonJS
- 提供 `debounce`、`awaitTo`（await-to-js 模式）、`AOP`（面向切面）、字符串格式化等工具函数

### `docs` — VitePress 文档站
- 使用 `QinLanternResolver`（workspace 协议引用）实现组件自动注册
- 文档示例位于 `docs/examples/`
- 侧边栏通过 `autoSetSidebar()` 按目录自动生成

## Key Patterns

- **组件结构**: 每个组件一个目录，`index.vue`（模板/逻辑） + `index.ts`（导出/安装），通过 `withInstall()` 包装
- **样式**: 全局 SCSS 入口 `src/styles/index.scss`，每个组件独立 SCSS 文件；BEM mixins 定义在 `src/styles/mixins/`
- **Composables**: `useDialog`（弹窗开关 + AOP 包装）、`useTable`（分页列表）、`useRequest`（Loading 状态）；`useTable`/`useRequest` 标记为已废弃
- **Hooks**: `useNamespace`（BEM 类名生成 + CSS 变量）、`useGlobalConfig`、`useLocale`、`useUpload`
- **Vite 构建**: 库模式，多入口（主库 + locale + resolver），外部化 `vue` 和 `element-plus`
- **样式拷贝**: 构建时通过自定义 Vite 插件将 `src/styles/` 拷贝到 `dist/styles/`，供 sass 源样式导入
- **无测试框架**: 项目当前无测试文件或测试配置

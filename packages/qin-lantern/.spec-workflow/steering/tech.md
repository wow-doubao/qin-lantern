# 技术栈与架构文档

## 技术栈
- **核心框架**: Vue 3.5.19
- **UI 基础**: Element Plus ^2.11.8
- **构建工具**: Vite 7.1.3
- **开发语言**: TypeScript
- **CSS 预处理**: SCSS (sass ^1.90.0)
- **CSS 引擎**: UnoCSS
- **类型支持**: vue-tsc
- **组件解析**: unplugin-vue-components

## 架构决策

### 1. 样式管理与命名空间
为了解决样式冲突并支持深度定制，采用以下策略：
- **自定义命名空间**: 利用 Element Plus 的 `namespace` 配置能力。
- **SCSS 架构**:
  - 所有组件样式不再写在 `.vue` 文件的 `<style>` 块中。
  - 建立独立的 `src/styles` 目录（或组件同级 `style` 目录），管理所有 SCSS 文件。
  - 使用 SCSS 变量系统，支持主题覆盖。
  - 确保 SCSS 变量能够消费 Element Plus 的全局变量。

### 2. 构建与输出
- **产物输出**:
  - `dist` 目录包含 ESM 和 UMD 格式的 JS 包。
  - 必须生成独立的 CSS 文件。
  - **新增**: 必须保留并输出源 SCSS 文件，以便消费端项目进行变量覆盖。
- **类型定义**: 使用 `vite-plugin-dts` 生成 `.d.ts` 文件。

### 3. 组件自动导入 (Resolver)
- 增强现有的 `QinLanternResolver`：
  - **支持 `importStyle: 'sass'`**: 允许用户在按需加载组件时，自动引入对应的 SCSS 源码，从而实现主题定制。
  - **支持 `namespace` 配置**: 允许用户配置自定义命名空间（例如 `namespace: 'ep'`），Resolver 将自动处理类名和组件名称的映射（如果适用）。
  - 参考 `unplugin-vue-components/resolvers` 中 `ElementPlusResolver` 的实现逻辑。

### 4. 目录结构规范
- 组件逻辑与样式分离。
- 统一的入口文件 `index.ts` 导出组件和类型。
- 遵循 Vue 3 Composition API 风格。

## 依赖关系
- `element-plus` 作为 `peerDependencies` 和 `dependencies` (视具体封装程度而定，通常作为 peer 避免版本冲突，但此处 `package.json` 目前列在 `dependencies` 中，需确认是否调整)。
- `sass` 必须作为开发依赖，且在消费端若要使用 SCSS 源码也需安装。

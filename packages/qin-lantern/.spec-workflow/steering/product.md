# 产品指导文档

## 愿景
提供一套基于 Element Plus 封装的稳健、易用的 Vue 3 组件库，支持深度定制（如自定义命名空间）和按需加载，提升开发效率并保持 UI 一致性。

## 目标
- **封装性**: 将复杂的 Element Plus 配置简化为易用的组件。
- **一致性**: 保持所有封装组件外观和行为的一致性。
- **灵活性**: 支持自定义命名空间（namespace）以避免样式冲突。
- **样式分离**: 将组件样式抽离为独立的 SCSS 文件，支持按需引入。
- **构建优化**: 打包时生成 SCSS 样式文件，不仅是 CSS。
- **工具支持**: 升级 `QinLanternResolver` 以支持 `importStyle: 'sass'` 和自定义 `namespace` 配置。

## 目标受众
- 使用 Element Plus 的 Vue 3 开发者。
- 需要自定义主题或命名空间以避免样式冲突的开发者。
- 需要对 Element Plus 进行二次封装以适应特定业务场景的团队。

## 关键特性
- 基于 Element Plus ^2.11.8 开发。
- 全 TypeScript 编写，提供完整的类型支持。
- **命名空间支持**: 全面适配 Element Plus 的自定义命名空间功能。
- **样式架构**: 组件样式独立为 SCSS 文件，支持变量覆盖。
- **工程化增强**:
  - 打包产物包含源 SCSS 文件。
  - `QinLanternResolver` 支持 `importStyle: 'sass'` 和 `namespace: 'xxx'` 配置，与 Element Plus 生态保持一致。

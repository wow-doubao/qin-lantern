# 项目结构文档

## 目录结构
```
packages/qin-lantern/
├── src/
│   ├── components/       # UI 组件
│   │   ├── [component]/  # 单个组件目录 (如 button, card)
│   │   │   ├── index.ts  # 组件导出
│   │   │   ├── index.vue # 组件实现 (逻辑部分)
│   │   │   └── style/    # (新增) 组件样式目录
│   │   │       └── index.scss # 组件样式文件
│   ├── styles/           # (新增) 全局样式与变量
│   │   ├── index.scss    # 样式入口
│   │   └── variables.scss # SCSS 变量定义
│   ├── resolver/         # 组件自动导入解析器
│   │   └── index.ts      # QinLanternResolver 实现
│   ├── utils/            # 工具函数
│   └── index.ts          # 库的主入口
├── dist/                 # 构建产物
│   ├── es/               # ESM 模块
│   ├── lib/              # CJS 模块 (可选)
│   └── index.d.ts        # 类型定义
├── .spec-workflow/       # 规范工作流配置
└── vite.config.ts        # 构建配置
```

## 关键文件模式

### 组件文件 (`src/components/[name]/index.vue`)
- **逻辑**: 使用 `<script setup lang="ts">`。
- **样式**: **移除** `<style>` 块，改为在 SCSS 文件中定义样式。
- **Props/Emits**: 使用 TypeScript 接口定义。
- **命名空间**: 使用 Element Plus 的 `useNamespace` (或封装后的 hook) 生成类名，确保支持自定义命名空间。

### 样式文件 (`src/components/[name]/style/index.scss`)
- 定义组件特定的样式。
- 使用 `BEM` 命名规范。
- 引入全局变量文件以支持主题定制。

### 解析器 (`src/resolver/index.ts`)
- 实现 `QinLanternResolver` 函数。
- 接收 `QinLanternResolverOptions` 接口参数：
  - `importStyle`: `'sass' | boolean`
  - `namespace`: `string` (默认 'el' 或 'ql'，需统一)

## 编码规范
- **命名**:
  - 目录: kebab-case (如 `config-provider`)
  - 组件文件: PascalCase (如 `ConfigProvider.vue`) 或 index.vue
  - 类名: BEM 规范 (如 `el-button__icon`)，**必须**基于动态命名空间变量。
- **TypeScript**: 严格模式，禁止隐式 `any`。
- **Linting**: 遵循项目根目录的 ESLint 配置。

## 构建配置 (`vite.config.ts`)
- 配置 `rollupOptions` 以确保外部化依赖 (`element-plus`, `vue`)。
- 配置插件以输出 SCSS 文件到 `dist` 目录，保持目录结构或扁平化输出（视 Resolver 需求而定）。

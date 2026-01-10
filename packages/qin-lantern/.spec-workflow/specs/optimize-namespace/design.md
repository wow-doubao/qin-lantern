# 设计文档：命名空间优化与样式分离

## 1. 系统架构
本设计不引入新的微服务或数据库，而是对现有的 Vue 3 组件库架构进行重构。核心变更在于引入动态命名空间 Hook (`useNamespace`) 和基于 SCSS 的样式分离架构。

## 2. 详细设计

### 2.1 动态命名空间 (Dynamic Namespace)
#### 2.1.1 核心逻辑 (`useNamespace` Hook)
参考 Element Plus 的实现，创建一个 `hooks/use-namespace/index.ts`。
该 Hook 将提供以下功能：
- 接收组件名称（block）。
- 基于全局配置（通过 `provide/inject` 获取）或默认值（`el`，建议修改为 `ql` 作为库的默认值，但需兼容）生成类名生成器。
- 返回 BEM 辅助函数：`b()`, `e()`, `m()`, `be()`, `em()`, `bm()`, `bem()`, `is()`。

**接口定义**:
```typescript
export const useNamespace = (block: string) => {
  const namespace = useGlobalConfig('namespace', 'ql'); // 默认 'ql'
  const b = (blockSuffix = '') => ... // 生成 .ns-block
  const e = (element?: string) => ... // 生成 .ns-block__element
  const m = (modifier?: string) => ... // 生成 .ns-block--modifier
  const is = (name: string, state: boolean | undefined) => ... // 生成 .is-name
  // ... 其他辅助函数
  return { namespace, b, e, m, be, em, bm, bem, is };
};
```

#### 2.1.2 模板迁移
所有 `.vue` 文件的 `<template>` 将被更新，移除硬编码的类名字符串，改为绑定 `ns.b()`, `ns.e()` 等。

**示例**:
```vue
<!-- Before -->
<div class="el-button"></div>

<!-- After -->
<script setup lang="ts">
import { useNamespace } from '@qin-lantern/hooks'

const ns = useNamespace('button')
</script>

<template>
  <div :class="ns.b()" />
</template>
```

### 2.2 样式架构 (Style Architecture)
#### 2.2.1 目录结构
```
src/
  styles/
    index.scss       # 总入口
    variables.scss   # 变量定义 (消费 Element Plus 变量并定义自己的)
    mixins/          # BEM mixins
      mixins.scss
      var.scss
  components/
    button/
      index.vue
      style/
        index.scss   # Button 组件样式
```

#### 2.2.2 SCSS 变量与 Mixin
- **变量**: 使用 CSS 变量（CSS Custom Properties）以支持动态主题，同时保留 SCSS 变量用于编译时配置。
- **Mixin**: 创建 `b`, `e`, `m` 等 SCSS mixin，它们必须利用 `$namespace` 变量（默认为 `ql`，但应可配置）。

**SCSS 示例**:
```scss
// src/styles/mixins/mixins.scss
$namespace: 'ql' !default;

@mixin b($block) {
  $B: $namespace + '-' + $block !global;
  .#{$B} {
    @content;
  }
}
```

### 2.3 Resolver 增强
修改 `packages/qin-lantern/src/resolver/index.ts`。
#### 2.3.1 接口扩展
```typescript
export interface QinLanternResolverOptions {
  /**
   * import style css or sass with source
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * custom namespace
   * @default 'ql'
   */
  namespace?: string
}
```

#### 2.3.2 解析逻辑
- 如果 `importStyle: 'sass'`，侧边效应（sideEffects）应指向 `qin-lantern/es/components/[name]/style/index`（假设构建后结构）。
- 需确保解析出的组件名称与文件路径匹配。

### 2.4 构建流程 (Build Process)
#### 2.4.1 Vite 配置
- 使用 `vite-plugin-static-copy` 或自定义插件，在构建时将 `src/components/**/style/*.scss` 和 `src/styles/**/*.scss` 复制到 `dist` 目录。
- 确保 `package.json` 的 `exports` 字段暴露这些样式文件。

## 3. 数据库设计
无（纯前端库）。

## 4. API 设计
无（不涉及后端 API，仅涉及组件 Props/Slots 变更，暂无破坏性 API 变更）。

## 5. 安全考虑
无特殊安全风险。

## 6. 第三方库
- `sass`: 用于样式预处理。
- `unplugin-vue-components`: 用于测试 Resolver。
- `element-plus`: 核心依赖，需确保与其样式变量兼容。

## 7. 测试策略
- **单元测试**: 为 `useNamespace` 编写测试用例，验证不同配置下生成的类名是否正确。
- **快照测试**: 对关键组件进行快照测试，确保迁移后 DOM 结构（除类名外）保持不变。
- **集成测试**: 创建一个示例应用，配置自定义 namespace，验证样式是否正确应用且无冲突。

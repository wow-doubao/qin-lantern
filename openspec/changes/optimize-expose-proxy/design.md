## Context

组件库中 `QlFormList`、`QlUpload` 等组件通过模板 ref 引用内部 Element Plus 组件实例，然后逐一手写代理函数暴露方法：

```ts
const validate = (...arg: any[]) => form.value?.validate(...arg)
const validateField = (...arg: any[]) => form.value?.validateField(...arg)
// ... 每个方法重复
defineExpose({ validate, validateField, ... })
```

这种模式存在以下问题：
- 大量重复模板代码，每个方法需要手写代理函数
- 只能暴露个别方法，无法自动继承子组件的全部 API
- 子组件新增方法时，父组件需要手动跟进

## Goals / Non-Goals

**Goals:**
- 提供一个通用 composable，通过 Proxy 自动代理模板 ref 上子组件的**全部属性和方法**到组件实例的 exposed
- 重构 `QlFormList` 和 `QlUpload` 使用新方式
- 保持对外暴露的接口签名完全一致

**Non-Goals:**
- 不修改 `QlTable` 和 `QlPaging` 的 `defineExpose`（它们暴露的是自定义方法，不代理内部组件）
- 不引入新的外部依赖
- 不改变组件的公共 API

## Decisions

### 方案：`useExpose(ref, extra?)` — Proxy 懒代理 + getCurrentInstance

```ts
function useExpose<T>(
  targetRef: Ref<T | null>,
  extra?: Record<string, any>
): void
```

利用 **Proxy** 拦截属性访问，延迟委托到 ref 上，无需 `onMounted`。

注意：**不能使用 `defineExpose`**，因为它是 Vue 编译宏，仅在 `<script setup>` 顶层有效，在 composable 函数中调用无效果。改用 `getCurrentInstance()` 直接设置 `instance.exposed`。

**关键实现：**

```ts
import { getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

export function useExpose<T>(
  targetRef: Ref<T | null>,
  extra: Record<string, any> = {},
) {
  const instance = getCurrentInstance()
  if (!instance) return

  const hasExtra = Object.keys(extra).length > 0

  instance.exposed = new Proxy(hasExtra ? { ...extra } : {}, {
    get(target, prop: string) {
      if (prop in target) return target[prop]
      return (...args: any[]) => (targetRef.value as any)?.[prop]?.(...args)
    },
    has(target, prop: string) {
      return prop in target || (targetRef.value as any)?.[prop] !== undefined
    },
  })
}
```

- **懒求值**：属性访问时才取 `targetRef.value`，不依赖 `onMounted`
- **全量代理**：所有属性访问自动委托到 ref，子组件新增方法自动继承
- **extra 优先**：extra 中的 key 走显式值，不走 Proxy
- **调用安全**：通过 `?.` 链式调用，ref 未就绪时不报错

**替代方案对比：**

| 方案 | 优点 | 缺点 |
|------|------|------|
| **手动列举方法**（当前） | 显式可控 | 重复代码、遗漏风险 |
| **reactive + onMounted** | Object.keys 可见 | 依赖 onMounted、SSR 不兼容、代码更复杂 |
| **Proxy + getCurrentInstance（选中）** | 极简代码、懒求值、SSR 安全、无时序依赖 | 需要实现 ownKeys 等 trap 才能被 Object.keys 发现 |

## Risks / Trade-offs

- **[`defineExpose` 不可用]** `defineExpose` 是编译宏，提取到函数中无效 → 使用 `getCurrentInstance()` 直接设置 `instance.exposed`，效果等价
- **[Object.keys 不可见]** Proxy 的属性在 `Object.keys()` 中默认不可见 → 暂不影响，Vue 的 exposed 通过 `in` 操作符和 `get` 访问，不依赖 `Object.keys`
- **[extra 同名覆盖]** 如果 extra 中的 key 与 ref 上的方法同名，extra 优先 → 这是预期行为，组件可自定义覆盖
- **[has trap 误判]** `prop in targetRef.value` 可能获取到不期望的属性 → 通过 `?.[prop] !== undefined` 过滤未定义属性

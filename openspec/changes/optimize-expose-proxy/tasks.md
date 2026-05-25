## 1. 创建 useExpose composable

- [x] 1.1 在 `packages/qin-lantern/src/composables/` 下创建 `useExpose.ts`，基于 Proxy 实现 `useExpose<T>(targetRef, extra?)` 函数
- [x] 1.2 在 `packages/qin-lantern/src/composables/index.ts` 中验证导出

## 2. 重构 QlFormList

- [x] 2.1 在 `formList/index.vue` 中引入 `useExpose`，替换手动代理 ElForm 方法，将 `isHide` 通过 `extra` 传入
- [x] 2.2 移除原手动定义的 validate、validateField、resetFields、scrollToField、clearValidate 5 个函数

## 3. 重构 QlUpload

- [x] 3.1 在 `upload/index.vue` 中引入 `useExpose`，替换手动代理 ElUpload 方法
- [x] 3.2 移除原手动定义的 abort、submit、clearFiles、handleStart、handleRemove 5 个函数

## 4. 验证

- [x] 4.1 执行 `pnpm lint` 确保无 lint 错误
- [x] 4.2 执行 `pnpm ui:build` 确保构建通过

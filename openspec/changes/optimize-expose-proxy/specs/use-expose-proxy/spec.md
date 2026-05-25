## ADDED Requirements

### Requirement: useExpose 通过 Proxy 懒代理模板 ref 的全部属性到组件 exposed

系统 SHALL 提供一个 `useExpose` composable，利用 Proxy 将模板 ref 上的全部属性懒代理到当前组件的 `instance.exposed`（通过 `getCurrentInstance()` 实现），无需 `onMounted`。

```ts
function useExpose<T>(
  targetRef: Ref<T | null>,
  extra?: Record<string, any>
): void
```

#### Scenario: 自动代理 ElForm 的全部方法
- **WHEN** 组件内定义 `const formRef = ref<typeof ElForm>()` 并调用 `useExpose(formRef, { isHide })`
- **THEN** 外部访问组件的 `validate`、`resetFields` 等属性时，实际委托到 `formRef.value.validate()`、`formRef.value.resetFields()`
- **THEN** 外部访问 `isHide` 时返回 extra 中的值，不走 ref

#### Scenario: 代理 ElUpload 的全部方法
- **WHEN** 组件内定义 `const uploadRef = ref<typeof ElUpload>()` 并调用 `useExpose(uploadRef)`
- **THEN** 外部访问 `abort`、`submit`、`clearFiles` 等方法时，实际委托到 `uploadRef.value`

#### Scenario: extra 同名属性覆盖 ref 属性
- **WHEN** `useExpose(formRef, { validate: customFn })` 且 `formRef.value.validate` 也存在
- **THEN** `validate` 优先返回 `extra` 中的 `customFn`

#### Scenario: ref 未就绪时访问不报错
- **WHEN** `targetRef.value` 为 `null` 时调用代理方法
- **THEN** 返回 `undefined`，不抛出异常

#### Scenario: 不传 extra 时也能正常工作
- **WHEN** 调用 `useExpose(ref)` 但不传 `extra`
- **THEN** 所有属性访问都委托到 `ref.value`

### Requirement: 重构 QlFormList 的方法暴露

`QlFormList` SHALL 使用 `useExpose` 替代手动代理 ElForm 的方法。

#### Scenario: QlFormList 暴露 ElForm 的全部 exposed 方法
- **WHEN** 外部调用 `QlFormList` 的 `validate`、`validateField`、`resetFields`、`scrollToField`、`clearValidate` 等方法
- **THEN** 行为与重构前完全一致
- **THEN** `isHide` 自定义方法仍然暴露

### Requirement: 重构 QlUpload 的方法暴露

`QlUpload` SHALL 使用 `useExpose` 替代手动代理 ElUpload 的方法。

#### Scenario: QlUpload 暴露 ElUpload 的全部 exposed 方法
- **WHEN** 外部调用 `QlUpload` 的 `abort`、`submit`、`clearFiles`、`handleStart`、`handleRemove` 等方法
- **THEN** 行为与重构前完全一致

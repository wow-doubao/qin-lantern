# tool — 通用工具函数

## debounce

防抖函数：一定时间内只执行最后一次操作。

### 签名

```ts
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait?: number,       // 延迟时间（ms），默认 300
  immediate?: boolean,  // 是否立即执行，默认 false
): (...args: Parameters<T>) => void
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fn | Function | (必填) | 要防抖的函数 |
| wait | number | 300 | 延迟时间（毫秒） |
| immediate | boolean | false | 是否在首次调用时立即执行 |

### 示例

```ts
import { debounce } from '@qin-lantern/utils'

// 搜索框输入防抖
const handleSearch = debounce((keyword: string) => {
  console.log('搜索', keyword)
}, 500)

// 立即执行模式（首次点击立即触发，后续防抖）
const handleClick = debounce(() => {
  console.log('被点击了')
}, 300, true)
```

---

## awaitTo

await-to-js 模式的优雅错误处理，避免 try-catch 嵌套。

### 签名

```ts
export const awaitTo = <T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,    // 附加到错误对象的额外信息
): Promise<[U, undefined] | [null, T]>
```

### 返回值

- 成功：`[null, data]`
- 失败：`[error, undefined]`

### 示例

```ts
import { awaitTo } from '@qin-lantern/utils'

// 基本用法
const [err, user] = await awaitTo(fetchUser(123))
if (err) {
  console.error('获取用户失败', err)
  return
}
console.log('用户数据', user)

// 附加错误信息
const [err2, data] = await awaitTo(
  fetch('/api/data'),
  { source: 'homePage' }
)
if (err2) {
  // err2 包含 { source: 'homePage', ...originalError }
}
```

---

## AOP

面向切片编程，在函数执行前后切入自定义逻辑。

### 签名

```ts
export class AOP {
  static before<F extends (...args: any[]) => any>(
    fn: F,
    beforeFn: (...args: Parameters<F>) => void,
  ): (...args: Parameters<F>) => ReturnType<F>

  static after<F extends (...args: any[]) => any>(
    fn: F,
    afterFn: (...args: Parameters<F>) => void,
  ): (...args: Parameters<F>) => ReturnType<F>
}
```

### 示例

```ts
import { AOP } from '@qin-lantern/utils'

// 业务逻辑
const submit = (formData: Record<string, any>) => {
  console.log('提交数据', formData)
}

// 切入前：埋点上报
const wrappedSubmit = AOP.before(submit, (formData) => {
  console.log('埋点：用户点击提交', formData)
})

// 切入后：关闭弹窗
const finalSubmit = AOP.after(wrappedSubmit, () => {
  console.log('提交完成，关闭弹窗')
})

finalSubmit({ name: '张三' })
// 输出：
// 埋点：用户点击提交 { name: '张三' }
// 提交数据 { name: '张三' }
// 提交完成，关闭弹窗
```
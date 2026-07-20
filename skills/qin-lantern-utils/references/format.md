# format — 格式化函数

## number

金融数字格式化，添加千分位逗号并保留指定小数位。

### 签名

```ts
export const number = (s: number | string, n?: number): string
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| s | number \| string | (必填) | 需要格式化的值 |
| n | number | 2 | 保留几位小数 |

### 示例

```ts
import { format } from '@qin-lantern/utils'

format.number(1234567.89)    // '1,234,567.89'
format.number(1234567.89, 0) // '1,234,568'
format.number('9876543.21')  // '9,876,543.21'
```

---

## fixde

数字保留 n 位小数。

### 签名

```ts
export const fixde = (value: number | string, n: number): string
```

### 示例

```ts
format.fixde(3.14159, 2)  // '3.14'
format.fixde('10', 3)     // '10.000'
format.fixde('abc', 2)    // '0'（非数字返回 '0'）
```

---

## hidden

字符串脱敏，用星号替换中间部分。

### 签名

```ts
export const hidden = (
  value: number | string,
  frontLen?: number,   // 前面保留位数，默认 3
  endLen?: number,     // 后面保留位数，默认 4
  star?: string,       // 替换符号，默认 '*'
): string
```

### 示例

```ts
format.hidden('13812345678')           // '138****5678'
format.hidden('13812345678', 3, 2)     // '138******78'
format.hidden('6222021234567890', 6, 4) // '622202******7890'
format.hidden('password123', 1, 1, '#') // 'p#########3'
```

---

## trim

去除字符串中的空格。

### 签名

```ts
export const trim = (str: string, pos?: 'both' | 'left' | 'right' | 'all'): string
```

| pos 值 | 说明 |
|--------|------|
| `both`（默认） | 去除两端空格 |
| `left` | 去除左侧空格 |
| `right` | 去除右侧空格 |
| `all` | 去除所有空格 |

### 示例

```ts
format.trim('  hello  ')       // 'hello'
format.trim('  hello  ', 'left')  // 'hello  '
format.trim('  hello  ', 'right') // '  hello'
format.trim('  h e l l o  ', 'all') // 'hello'
```

---

## dispose

数据显示处理，添加前后缀。值为空时返回 `-`。

### 签名

```ts
export const dispose = (value: number | string, before?: string, after?: string): string
```

### 示例

```ts
format.dispose(100, '¥')       // '¥100'
format.dispose(80, '', '%')    // '80%'
format.dispose(0, '¥')         // '-'（值为 0 视为空）
format.dispose('', '¥')        // '-'
```
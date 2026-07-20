# 安装与使用

## 安装

```bash
pnpm add @qin-lantern/utils
```

## 导入方式

### 按模块导入

```ts
import { tool, format, test } from '@qin-lantern/utils'

// 使用
tool.debounce(fn, 300)
format.number(1234567.89)
test.email('test@example.com')
```

### 按需导入

```ts
import { debounce, awaitTo } from '@qin-lantern/utils'
import { number, hidden } from '@qin-lantern/utils'
import { email, mobile } from '@qin-lantern/utils'
```

### CommonJS 导入

```ts
const { tool, format, test } = require('@qin-lantern/utils')
```

## 模块说明

| 模块 | 导出方式 | 函数数 |
|------|---------|--------|
| tool | named export | 3 |
| format | namespace export | 5 |
| test | namespace export | 14 |
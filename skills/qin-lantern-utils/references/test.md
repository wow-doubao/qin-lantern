# test — 校验函数

所有校验函数返回 `boolean`。

## email

验证电子邮箱格式。

```ts
test.email(value: string): boolean
```

```ts
test.email('test@example.com')   // true
test.email('invalid-email')      // false
```

---

## mobile

验证手机号格式（中国大陆）。

```ts
test.mobile(value: number | string): boolean
```

```ts
test.mobile('13812345678')  // true
test.mobile('12345678901')  // false
```

---

## idCard

验证身份证号码（18 位，支持 X 结尾）。

```ts
test.idCard(value: number | string): boolean
```

```ts
test.idCard('110101199001011234')  // true
test.idCard('123456')              // false
```

---

## carNo

验证车牌号（支持新能源和传统车牌）。

```ts
test.carNo(value: string): boolean
```

```ts
test.carNo('京A12345')       // true（传统车牌）
test.carNo('京A12345D')      // true（新能源车牌）
test.carNo('invalid')        // false
```

---

## amount

验证金额格式（只允许保留两位小数）。

```ts
test.amount(value: number | string): boolean
```

```ts
test.amount('100.00')   // true
test.amount('100.123')  // false
test.amount('0.50')     // true
```

---

## enOrNum

验证只能是字母或数字。

```ts
test.enOrNum(value: number | string): boolean
```

```ts
test.enOrNum('abc123')  // true
test.enOrNum('abc-123') // false
```

---

## floatOrNum

验证只能是数字或小数。

```ts
test.floatOrNum(value: number | string): boolean
```

```ts
test.floatOrNum('123')     // true
test.floatOrNum('123.45')  // true
test.floatOrNum('abc')     // false
```

---

## range

验证数值是否在指定范围内。

```ts
test.range(value: number | string, param: [number, number]): boolean
```

```ts
test.range(10, [0, 20])   // true
test.range(30, [0, 20])   // false
```

---

## rangeLength

验证字符串长度是否在指定范围内。

```ts
test.rangeLength(value: number | string, param: [number, number]): boolean
```

```ts
test.rangeLength('hello', [0, 10])  // true
test.rangeLength('hello', [0, 3])   // false
```

---

## empty

判断是否为空（undefined、空字符串、null、空数组、空对象、0、NaN 均视为空）。

```ts
test.empty(value: any): boolean
```

```ts
test.empty(undefined)  // true
test.empty('')         // true
test.empty(null)       // true
test.empty([])         // true
test.empty({})         // true
test.empty(0)          // true
test.empty('hello')    // false
test.empty([1, 2])     // false
```

---

## array

判断是否为纯 JavaScript 数组。

```ts
test.array(value: any): boolean
```

```ts
test.array([1, 2, 3])     // true
test.array({})             // false
test.array('hello')        // false
```

---

## object

判断是否为纯 JavaScript 对象。

```ts
test.object(value: any): boolean
```

```ts
test.object({})            // true
test.object({ a: 1 })      // true
test.object([])            // false
test.object(null)          // false
```

---

## isMobileDevice

判断当前设备是否为移动端。

```ts
test.isMobileDevice(): boolean
```

```ts
if (test.isMobileDevice()) {
  console.log('移动端设备')
} else {
  console.log('桌面端设备')
}
```
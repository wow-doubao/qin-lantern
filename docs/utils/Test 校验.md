# Test 校验
```
# 安装
npm i @qin-lantern/utils
```
```js
import { test } from '@qin-lantern/utils'
```

## 是否邮箱号
 * @param {String} value - 处理的值
 * @return {Boolean} 是否为邮箱
```js
test.email('123@qq.com') // true
```

## 是否手机号
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为手机
```js
test.mobile('1888') // false
```

## 是否身份证号
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为身份证号码
```js
test.idCard('6301') // false
```

## 是否车牌号
 * @param {String} value - 处理的值
 * @return {Boolean} 是否为是否车牌号
```js
test.carNo('京A88888') // true
```

## 是否金额
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为只有2位小数的值
```js
test.amount('666.66') // true
```

## 只能是字母或者数字
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为字母或者数字
```js
test.enOrNum('abc') // true
```

## 只能是数字或小数
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为数字或小数
```js
test.floatOrNum('123.45') // true
```

## 验证一个值范围
 * @param {Number|String} value - 处理的值
 * @param {[Number, Number]} param - 范围数组 [min, max]
```js
test.range(10, [0, 20]) // true
```

## 验证一个长度范围
 * @param {Number|String} value - 处理的值
 * @param {[Number, Number]} param - 范围数组 [min, max]
```js
test.rangeLength(11111, [0, 3]) // false
```

## 是否为空
这里指的“空”，包含如下几种情况：

- 值为undefined(一种类型)，非字符串"undefined"
- 字符串长度为0，也即空字符串
- 值为false(布尔类型)，非字符串"false"
- 值为数值0(非字符串"0")，或者NaN
- 值为null，空对象{}，或者长度为0的数组

 * @param {any} value - 处理的值
 * @return {Boolean} 判断是否为空
```js
test.empty({}) // true
```

## 是否数组
 * @param {any} value - 处理的值
 * @return {Boolean} 仅对纯JavaScript数组返回true
```js
test.array([]) // true
```

## 是否对象
 * @param {any} value - 处理的值
 * @return {Boolean} 仅对纯JavaScript对象返回true
```js
test.object({}) // true
```

## 是否为移动端设备
```js
test.isMobileDevice()
```

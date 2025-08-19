# Tool 工具
```
# 安装
npm i @qin-lantern/utils
```
```js
import { AOP, awaitTo, debounce } from '@qin-lantern/utils'
```
## 防抖
防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * @param {Function} fn 要执行的回调函数
 * @param {Number} wait 延时的时间，单位是毫秒，默认是300毫秒
 * @param {Boolean} immediate 是否立即执行，默认是false
```js
const myDebounce = debounce((data) => {
  console.log(data)
})

myDebounce('传参')
```

## try ...catch的优雅处理方式
 * @param { Promise } promise
 * @param { Object } errorExt - 传递给err对象的其他信息
 * @return { Promise }
```js
let [ err, user ] = await awaitTo(axios(123));
if (err) return cb('No user found');
```

## 切片注入
```js
let logic = function () {
  console.log('业务代码')
}

/**
 * 切入前
 * @param {Function} fn         业务代码
 * @param {Function} beforeFn   前置函数
 */
logic = AOP.before(logic, () => {
  console.log('切入前代码')
})

/**
 * 切入后
 * @param {Function} fn         业务代码
 * @param {Function} afterFn    后置函数
 */
logic = AOP.after(logic, () => {
  console.log('切入后代码')
})

logic()
```

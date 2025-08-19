# Format 格式化
```
# 安装
npm i @qin-lantern/utils
```
```js
import { format } from '@qin-lantern/utils'
```

## 金融小数数字格式化
 * @param {String|number} s - 需要格式化得值
 * @param {Number} n - 保留小数位数，默认2
```js
format.number(123456789.123) // 123,456,789.12
```

## 数字保留n位小数
 * @param {Number|String} value - 处理的值
 * @param {Number} n - 保留位数
```js
format.fixde(123456789.123, 1) // 123456789.1
```

## 字符串变星号 默认隐藏中间四位 显示前3后4
 * @param {Number|String} value - 处理的值
 * @param {Number} frontLen - 前面需要保留几位，默认3
 * @param {Number} endLen - 后面需要保留几位，默认4
 * @param {String} star - 隐藏的符号，默认*
```js
format.hidden(18888888888) // 188****8888
```

## 去除空格
 * @param {String} str - 处理的值
 * @param {String} pos - 默认both：去除两端空格；left：左侧空格；right：右侧空格；all：全部空格；
```js
format.trim(' Hello World ') // 'Hello World'
```

## 数据显示处理
 * @param {Number|String} value - 数据
 * @param {String} before - 数据前缀
 * @param {String} after - 数据后缀
```js
format.dispose('') // '-'
format.dispose(123, '', '%') // '123%'
```

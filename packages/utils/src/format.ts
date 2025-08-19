/* eslint-disable */
// 格式化工具
/**
 * 金融小数数字格式化
 * @param {String|number} s - 需要格式化得值
 * @param {number} n - 保留几位小数，默认2位
 */
export const number = (s: number|string, n: number = 2) => {
  // n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

/**
 * 数字保留n位小数
 * @param {Number|String} value - 处理的值
 * @param {Number} n - 保留位数
 * @return {String} 保留n位小数
 */
export const fixde = (value: number|string, n: number) => {
  const num = Number(value)

  return isNaN(num) ? '0': num.toFixed(n)
}

/**
 * 字符串变星号 默认隐藏中间四位 显示前3后4
 * @param {Number|String} value - 处理的值
 * @param {Number} frontLen - 前面需要保留几位
 * @param {Number} endLen - 后面需要保留几位
 * @param {String} star - 隐藏的符号，默认*
 * @return {String} 隐藏数字，字符中的部分为星号
 */
export const hidden = (value: number|string, frontLen = 3, endLen = 4, star = '*') => {
  if (!value) return ''
  const str = String(value)
  const len = str.length - frontLen - endLen
  let xing = ''
  for (let i = 0; i < len; i++) {
    xing += star
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
}


/**
 * 去除空格
 * @param {String} str - 处理的值
 * @param {String} pos - 默认both：去除两端空格；left：左侧空格；right：右侧空格；all：全部空格；
 * @return {String} 去除空格后的字符串
 */
export const trim = (str: string, pos = 'both') => {
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  } else if (pos == 'left') {
    return str.replace(/^\s*/, '')
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  } else if (pos == 'all') {
    return str.replace(/\s+/g, '')
  } else {
    return str
  }
}

/**
 * 数据显示处理
 * @param {Number|String} value - 数据
 * @param {String} before - 数据前缀
 * @param {String} after - 数据后缀
 * @returns {String} - 处理后的值
 */
export const dispose = (value: number|string, before = '', after = '') => {
  return value ? before + value + after : '-'
}

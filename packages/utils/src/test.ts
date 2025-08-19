/* eslint-disable */
// 校验工具

/**
 * 验证电子邮箱格式
 * @param {String} value - 处理的值
 * @return {Boolean} 是否为邮箱
 */
export const email = (value: string) => {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为手机
 */
export const mobile = (value: number|string) => {
  const str = String(value)
  return /^1[23456789]\d{9}$/.test(str)
}

/**
 * 验证身份证号码
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为身份证号码
 */
export const idCard = (value: number|string) => {
  const str = String(value)
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(str)
}

/**
 * 是否车牌号
 * @param {String} value - 处理的值
 * @return {Boolean} 是否为是否车牌号
 */
export const carNo =(value: string) => {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7) {
      return creg.test(value)
  } if (value.length === 8) {
      return xreg.test(value)
  }
  return false
}

/**
 * 金额,只允许2位小数
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为只有2位小数的值
 */
export const amount = (value: number|string) => {
  const str = String(value)
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(str)
}

/**
 * 只能是字母或者数字
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为字母或者数字
 */
export const enOrNum = (value: number|string) => {
  const str = String(value)
  return /^[0-9a-zA-Z]*$/g.test(str)
}

/**
 * 只能是数字或小数
 * @param {Number|String} value - 处理的值
 * @return {Boolean} 是否为数字或小数
 */
export const floatOrNum = (value: number|string) => {
  const str = String(value)
  return /^\d+(\.\d+)?$/.test(str)
}

/**
 * 验证一个值范围
 * @param {Number|String} value - 处理的值
 * @param {[Number, Number]} param - 范围数组 [min, max]
 * @return {Boolean} 值的大小是否在范围内
 *
 * @example
 * range(10, [0, 20])
 */
export const range = (value: number|string, param: [number, number]) => {
  const num = Number(value);
  return num >= param[0] && num <= param[1]
}

/**
 * 验证一个长度范围
 * @param {Number|String} value - 处理的值
 * @param {[Number, Number]} param - 范围数组 [min, max]
 * @return {Boolean} 值的长度是否在范围内
 *
 * @example
 * rangeLength(111, [0, 5])
 */
export const rangeLength = (value: number|string, param: [number, number]): boolean => {
  const str = String(value);
  return str.length >= param[0] && str.length <= param[1];
};

/**
 * 判断是否为空
 * @param {any} value - 处理的值
 * @return {Boolean} 判断是否为空
 */
export const empty = (value: any) => {
  switch (typeof value) {
  case 'undefined':
    return true
  case 'string':
    if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
    break
  case 'boolean':
    if (!value) return true
    break
  case 'number':
    if (value === 0 || isNaN(value)) return true
    break
  case 'object':
    if (value === null) return true;
    if (Array.isArray(value)) return value.length === 0;
    return Object.keys(value).length === 0;
  default:
    return false;
  }
}

/**
 * 是否数组
 * @param {any} value - 处理的值
 * @return {Boolean} 仅对纯JavaScript数组返回true
 */
export const array = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 * @param {any} value - 处理的值
 * @return {Boolean} 仅对纯JavaScript对象返回true
 */
export const object = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否为移动端
 * @returns {Boolean}
 */
export const isMobileDevice =  () => {
  const userAgent = navigator.userAgent

  // 检查用户代理字符串中是否包含移动设备的关键词
  return /(mobile|android|iphone|ipod|ipad|iemobile|blackberry|webos|windows phone)/i.test(userAgent)
}

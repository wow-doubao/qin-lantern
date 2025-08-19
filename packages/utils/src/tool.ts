// 常用工具函数

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * @param {Function} fn 要执行的回调函数
 * @param {number} wait 延时的时间
 * @param {boolean} immediate 是否立即执行
 * const myDebounce = debounce(data => {
 *  console.log(data)
 * })
 *
 * myDebounce('防抖传参')
 */

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 300,
  immediate: boolean = false,
) => {
  if (typeof fn !== 'function')
    throw new Error('fn must be a function!')

  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const init = immediate && !timer
    clearTimeout(timer!)
    timer = setTimeout(() => {
      timer = null
      if (!immediate)
        fn.call(this, ...args)
    }, wait)
    if (init)
      fn.call(this, ...args)
  }
}

/**
 * 来源await-to-js包
 * try ...catch的优雅处理方式
 * let [ err, user ] = await awaitTo(axios(123));
 * if(err) return cb('No user found');
 * @param { Promise } promise
 * @param {object} errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export const awaitTo = <T, U = Error> (
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> => promise
  .then<[null, T]>((data: T) => [null, data])
  .catch<[U, undefined]>((err: U) => {
    if (errorExt) {
      const parsedError = Object.assign({}, err, errorExt)
      return [parsedError, undefined]
    }

    return [err, undefined]
  })

/**
 * 面向切片编程
var logic = function () {
console.log('业务代码')
}
// 切入
logic = AOP.before(logic, function () {
console.log('切入前代码')
})
logic = AOP.after(logic, function () {
console.log('切入后代码')
})

logic()
 */
// export class AOP {
//   /**
//   * 切入前
//   * @param {Function} fn         业务代码
//   * @param {Function} beforeFn   前置函数
//   * @returns
//   */
//   static before (fn: Function, beforeFn: Function) {
//     return function (this: any, ...args: any[]) {
//       beforeFn(...args)
//       const agent = fn.call(this, ...args)
//       return agent
//     }
//   }

//   /**
//   * 切入后
//   * @param {Function} fn         业务代码
//   * @param {Function} afterFn    后置函数
//   * @returns
//   */
//   static after (fn: Function, afterFn: Function) {
//     return function (this: any, ...args: any[]) {
//       const agent = fn.call(this, ...args)
//       afterFn(...args)
//       return agent
//     }
//   }
// }

export class AOP {
  /**
   * 切入前
   * @param fn 业务代码
   * @param beforeFn 前置函数
   * @returns
   */
  static before<F extends (...args: any[]) => any>(
    fn: F,
    beforeFn: (...args: Parameters<F>) => void,
  ): (...args: Parameters<F>) => ReturnType<F> {
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      beforeFn(...args)
      const agent = fn.call(this, ...args)
      return agent
    }
  }

  /**
   * 切入后
   * @param fn 业务代码
   * @param afterFn 后置函数
   * @returns
   */
  static after<F extends (...args: any[]) => any>(
    fn: F,
    afterFn: (...args: Parameters<F>) => void,
  ): (...args: Parameters<F>) => ReturnType<F> {
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      const agent = fn.call(this, ...args)
      afterFn(...args)
      return agent
    }
  }
}

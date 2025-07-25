// 模拟接口延时
export const delayed = (time: number = 2000) => <T>(data?:T):Promise<T | void> => new Promise((resolve) => {
  const delayedTime = setTimeout(() => {
    resolve(data)
    clearTimeout(delayedTime)
  }, time)
})

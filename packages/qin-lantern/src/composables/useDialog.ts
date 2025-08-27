import type { Ref } from 'vue'
/**
 * 弹窗开关hook
 * @returns 返回一个数组
 * @example const {show, AOP} = useDialog()
 */

type FnWrapper = (...args: any[]) => Promise<unknown> | unknown

type AOPFunction = (fn: FnWrapper) => FnWrapper

interface DialogReturnType {
  show: Ref<boolean>
  AOP: AOPFunction
}

export const useDialog = (): DialogReturnType => {
  const show: Ref<boolean> = ref(false)

  const AOP: AOPFunction = (fn) => {
    return async function (...args: any[]) {
      const showData = unref(show)
      const agent = (typeof fn === 'function') ? await fn(...args) : null
      show.value = !showData
      return agent
    }
  }

  return {
    show,
    AOP,
  }
}

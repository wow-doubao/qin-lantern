// 废弃 使用alova useRequest代替
import type { Ref } from 'vue'
/**
 * Loading状态
 * @returns 返回一个数组
 * @example const {loading, send} = useRequest(requestFn)
 */
type RequestFunction = (...args: any[]) => Promise<any>

interface RequestReturnType {
  loading: Ref<boolean>
  send: RequestFunction
}

export const useRequest = (requestFn: RequestFunction): RequestReturnType => {
  const loading = ref(false)

  function send(...args: any[]) {
    loading.value = true
    return requestFn(...args).finally(() => {
      loading.value = false
    })
  }

  return {
    loading,
    send,
  }
}

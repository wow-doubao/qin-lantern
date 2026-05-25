import type { Ref } from 'vue'
import { getCurrentInstance } from 'vue'

/**
 * 自动代理模板 ref 上的全部属性到组件 expose。
 * 利用 Proxy 懒求值，子组件新增方法自动继承。
 *
 * @param targetRef - 模板 ref（如 `ref<typeof ElForm>()`）
 * @param extra - 额外暴露的自定义方法，同名时覆盖 ref 上的属性
 *
 * @example
 * ```ts
 * const formRef = ref<typeof ElForm>()
 * useExpose(formRef, { isHide })
 * // 外部可访问 formRef 的所有方法 + isHide
 * ```
 */
export function useExpose<T>(
  targetRef: Ref<T | null>,
  extra: Record<string, any> = {},
) {
  const instance = getCurrentInstance()
  if (!instance)
    return

  const hasExtra = Object.keys(extra).length > 0

  instance.exposed = new Proxy(hasExtra ? { ...extra } : {}, {
    get(target, prop: string) {
      if (prop in target)
        return target[prop]
      return (...args: any[]) => (targetRef.value as any)?.[prop]?.(...args)
    },
    has(target, prop: string) {
      return prop in target || (targetRef.value as any)?.[prop] !== undefined
    },
  })
}

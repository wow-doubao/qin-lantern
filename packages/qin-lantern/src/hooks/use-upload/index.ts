import type { InjectionKey, Ref } from 'vue'

export interface QlUploadConfig {
  action: string
  headers: Headers | Record<string, any>
}
export const uploadContextKey: InjectionKey<Ref<QlUploadConfig | undefined>>
  = Symbol('uploadContextKey')

export function useUpload() {
  const locale = inject(uploadContextKey, ref())
  return locale.value
}

import type { InjectionKey, Ref } from 'vue'
export type QlUploadConfig = {
  action: string
  headers: Headers | Record<string, any>
}
export const uploadContextKey: InjectionKey<Ref<QlUploadConfig | undefined>> =
  Symbol('uploadContextKey')

export const useUpload = () => {
  const locale = inject(uploadContextKey, ref())
  return locale.value
}

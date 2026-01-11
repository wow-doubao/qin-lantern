import type { InjectionKey, Ref } from 'vue'
import { computed, inject, provide, ref } from 'vue'

export const configProviderContextKey: InjectionKey<Ref<ConfigProviderContext>> = Symbol('qlConfigProvider')

export interface ConfigProviderContext {
  namespace?: string
  elNamespace?: string
}

export function useGlobalConfig<K extends keyof ConfigProviderContext>(
  key: K,
  defaultValue?: ConfigProviderContext[K],
): Ref<ConfigProviderContext[K]>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue: any = undefined,
) {
  const config = inject(configProviderContextKey, ref<ConfigProviderContext>({}))
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  }
  return config
}

export const provideGlobalConfig = (config: Ref<ConfigProviderContext>) => {
  provide(configProviderContextKey, config)
}

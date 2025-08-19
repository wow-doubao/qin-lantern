import type { MaybeRef } from '@vueuse/core'
import type { QlLanguage } from 'qin-lantern/locale'
import type { InjectionKey, Ref } from 'vue'

import { get } from 'lodash-unified'
import { zhCn } from 'qin-lantern/locale'
import { computed, inject, isRef, ref, unref } from 'vue'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext {
  locale: Ref<QlLanguage>
  lang: Ref<string>
  t: Translator
}

export function buildTranslator(locale: MaybeRef<QlLanguage>): Translator {
  return (path, option) =>
    translate(path, option, unref(locale))
}

export function translate(path: string, option: undefined | TranslatorOption, locale: QlLanguage): string {
  return (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`,
  )
}

export function buildLocaleContext(locale: MaybeRef<QlLanguage>): LocaleContext {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}

export const localeContextKey: InjectionKey<Ref<QlLanguage | undefined>>
  = Symbol('qlLocaleContextKey')

export function useLocale(localeOverrides?: Ref<QlLanguage | undefined>) {
  const locale = localeOverrides || inject(localeContextKey, ref())!
  return buildLocaleContext(computed(() => locale.value || zhCn))
}

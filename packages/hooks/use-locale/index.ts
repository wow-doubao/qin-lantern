import { computed, inject, isRef, ref, unref } from 'vue'
import { get } from 'lodash-unified'
import { zhCn } from 'qin-lantern/locale/index'

import type { MaybeRef } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import type { QlLanguage } from 'qin-lantern/locale'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export type LocaleContext = {
  locale: Ref<QlLanguage>
  lang: Ref<string>
  t: Translator
}

export const buildTranslator =
  (locale: MaybeRef<QlLanguage>): Translator =>
    (path, option) =>
      translate(path, option, unref(locale))

export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: QlLanguage
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )

export const buildLocaleContext = (
  locale: MaybeRef<QlLanguage>
): LocaleContext => {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  }
}

export const localeContextKey: InjectionKey<Ref<QlLanguage | undefined>> =
  Symbol('qlLocaleContextKey')

export const useLocale = (localeOverrides?: Ref<QlLanguage | undefined>) => {
  const locale = localeOverrides || inject(localeContextKey, ref())!
  return buildLocaleContext(computed(() => locale.value || zhCn))
}

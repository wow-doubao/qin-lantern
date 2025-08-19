export { default as en } from './lang/en'
export { default as zhCn } from './lang/zh-cn'

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair
}

export interface QlLanguage {
  name: string
  ql: TranslatePair
}

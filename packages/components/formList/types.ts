import type { FormItemRule } from 'element-plus'

export interface Col {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface FormListOption {
  label?: string
  key?: string
  type: 'show' | 'txt' | 'input' | 'inputNumber' | 'radioGroup' | 'checkboxGroup' | 'switch' | 'autocomplete' | 'select' | 'cascader' | 'datePicker' | 'upload' | 'slot' | 'extendSlot'
  hidden?: boolean
  bind?: Record<string, any>
  on?: Record<string, (...args: any[]) => any>
  rule?: FormItemRule[]
  options?: Record<string, any>[]
  col?: number | Col
}
export type FormListOptions = FormListOption[]

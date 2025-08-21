import type { TableColumnInstance } from 'element-plus'

export interface TableLabel extends Partial<TableColumnInstance['$props']> {
  label: string
  prop: string
  show?: boolean
  slot?: boolean
  child?: TableLabel[]
}

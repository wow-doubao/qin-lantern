import type { TableColumnInstance } from 'element-plus'

// 递归树节点类型，不含 Element Plus 复杂类型继承，避免类型展开过深
export interface TableLabelChild {
  label: string
  prop: string
  show?: boolean
  slot?: boolean
  child?: TableLabelChild[]
}

export interface TableLabel extends Partial<TableColumnInstance['$props']> {
  label: string
  prop: string
  show?: boolean
  slot?: boolean
  child?: TableLabelChild[]
}

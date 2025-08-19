import type { App } from '@vue/runtime-core'
// 导入组件
import { QlButton } from './components/button'

import { QlCard } from './components/card'
import { QlConfigProvider } from './components/configProvider'
import { QlDialog } from './components/dialog'
import { QlDraggable } from './components/draggable'
import { QlDrawer } from './components/drawer'
import { QlFormList } from './components/formList'
import { QlImage } from './components/image'
import { QlPagination } from './components/pagination'
import { QlPaging } from './components/paging'
import { QlPlusMinus } from './components/plusMinus'
import { QlSpace } from './components/space'
import { QlTable } from './components/table'
import { QlUpload } from './components/upload'
import 'virtual:uno.css'
// $addComponent
export * from './components/button'
export * from './components/card'
export * from './components/configProvider'
export * from './components/dialog'
export * from './components/draggable'
export * from './components/drawer'
export * from './components/formList'
export * from './components/image'
export * from './components/pagination'
export * from './components/paging'
export * from './components/plusMinus'
export * from './components/space'
export * from './components/table'
export * from './components/upload'
// $addAllComponent

// 导入钩子函数
export * from './composables/useDialog'
export * from './composables/useRequest'
export * from './composables/useTable'

export default {
  install: (app: App) => {
    app.use(QlButton)
    app.use(QlCard)
    app.use(QlDialog)
    app.use(QlConfigProvider)
    app.use(QlSpace)
    app.use(QlDraggable)
    app.use(QlDrawer)
    app.use(QlImage)
    app.use(QlPagination)
    app.use(QlPlusMinus)
    app.use(QlUpload)
    app.use(QlFormList)
    app.use(QlTable)
    app.use(QlPaging)
    // $useComponent
  },
}

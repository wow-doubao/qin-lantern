import 'virtual:uno.css'
// eslint-disable-next-line vue/prefer-import-from-vue
import type { App } from '@vue/runtime-core'

// 导入组件
import { QlButton } from './components/button'
import { QlCard } from './components/card'
import { QlDialog } from './components/dialog'
import { QlConfigProvider } from './components/configProvider'
import { QlSpace } from './components/space'
import { QlDraggable } from './components/draggable'
import { QlDrawer } from './components/drawer'
import { QlImage } from './components/image'
import { QlPagination } from './components/pagination'
import { QlPlusMinus } from './components/plusMinus'
import { QlUpload } from './components/upload'
import { QlFormList } from './components/formList'
import { QlTable } from './components/table'
import { QlPaging } from './components/paging'
// $addComponent
export * from './components/button'
export * from './components/card'
export * from './components/dialog'
export * from './components/configProvider'
export * from './components/space'
export * from './components/draggable'
export * from './components/drawer'
export * from './components/image'
export * from './components/pagination'
export * from './components/plusMinus'
export * from './components/upload'
export * from './components/formList'
export * from './components/table'
export * from './components/paging'
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
  }
}

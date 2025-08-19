import type { SFCWithInstall } from 'qin-lantern/utils/install'
import { withInstall } from 'qin-lantern/utils/install'
import formList from './index.vue'

export const QlFormList: SFCWithInstall<typeof formList> = withInstall(formList)

export * from './types'

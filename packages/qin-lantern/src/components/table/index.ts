import type { SFCWithInstall } from 'qin-lantern/utils/install'
import { withInstall } from 'qin-lantern/utils/install'
import table from './index.vue'

export const QlTable: SFCWithInstall<typeof table> = withInstall(table)

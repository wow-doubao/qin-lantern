import type { ComponentResolver } from 'unplugin-vue-components'

export interface QinLanternResolverOptions {
  /**
   * import style css or sass with source
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * custom namespace
   * @default 'ql'
   */
  namespace?: string
}

function getSideEffects(_name: string, options: QinLanternResolverOptions): string | string[] | undefined {
  const { importStyle = 'css' } = options

  if (!importStyle)
    return

  if (importStyle === 'sass') {
    return 'qin-lantern/dist/styles/index.scss'
  }

  return 'qin-lantern/dist/qin-lantern.css'
}

export function QinLanternResolver(options: QinLanternResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.startsWith('Ql')) {
        return {
          name,
          from: 'qin-lantern',
          sideEffects: getSideEffects(name, options),
        }
      }
    },
  }
}

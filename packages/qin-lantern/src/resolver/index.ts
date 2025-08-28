import type { ComponentResolver } from 'unplugin-vue-components'

export function QinLanternResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.startsWith('Ql')) {
        return {
          name,
          from: 'qin-lantern',
          sideEffects: 'qin-lantern/dist/qin-lantern.css',
        }
      }
    },
  }
}

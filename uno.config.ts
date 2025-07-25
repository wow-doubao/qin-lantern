// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  transformers: [
    transformerDirectives()
  ]
})

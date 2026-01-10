<script setup lang="ts">
import { ElImage } from 'element-plus'
import { useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlImage',
})

const props = defineProps({
  width: {
    type: [String, Number],
    default: 100,
  },
  height: {
    type: [String, Number],
    default: 100,
  },
  src: {
    type: String,
    default: '',
  },
})

const ns = useNamespace('image')
</script>

<template>
  <ElImage
    v-if="src"
    :class="ns.b()"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    :src="src"
    :preview-src-list="[src]"
    fit="cover"
    preview-teleported
  />
</template>

<style scoped lang="scss">
</style>

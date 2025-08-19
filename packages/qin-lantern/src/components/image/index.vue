<script setup lang="ts">
import { ElImage } from 'element-plus'

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
</script>

<template>
  <ElImage
    v-if="src"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    :src="src"
    :preview-src-list="[src]"
    fit="cover"
    preview-teleported
  />
</template>

<style scoped lang="scss">
</style>

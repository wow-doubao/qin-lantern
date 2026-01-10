<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlSpace',
})

const ns = useNamespace('space')
</script>

<template>
  <ElSpace
    direction="vertical"
    alignment="flex-start"
    :class="ns.b()"
    :prefix-cls="ns.b()"
    size="large"
  >
    <slot />
  </ElSpace>
</template>

<style lang="scss" scoped></style>

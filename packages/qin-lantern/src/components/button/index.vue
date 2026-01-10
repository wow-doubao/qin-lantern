<!--  -->
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlButton',
})

const ns = useNamespace('button')
</script>

<template>
  <ElButton
    type="primary"
    :class="ns.b()"
  >
    <slot />
  </ElButton>
</template>

<style scoped lang="scss"></style>

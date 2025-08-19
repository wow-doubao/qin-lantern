<script setup lang="ts">
import { ElSpace } from 'element-plus'

defineOptions({
  name: 'QlSpace',
})
</script>

<template>
  <ElSpace
    direction="vertical"
    alignment="flex-start"
    class="space"
    prefix-cls="space"
    size="large"
  >
    <slot />
  </ElSpace>
</template>

<style lang="scss" scoped>
.space{
  display: flex;
  :deep(.space__item) {
    width: 100%;
  }
}
</style>

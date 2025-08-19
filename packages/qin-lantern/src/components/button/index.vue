<!--  -->
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlButton',
})
const greaterOrEqual = useGreaterOrEqual()
const arr = ref('')
console.log(arr.value)
</script>

<template>
  <ElButton type="primary">
    {{ greaterOrEqual }}
    <slot />
  </ElButton>
</template>

<style scoped lang="scss"></style>

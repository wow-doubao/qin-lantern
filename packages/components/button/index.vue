<!--  -->
<template>
  <el-button type="primary">
    {{ greaterOrEqual }}
    <slot />
  </el-button>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'

const greaterOrEqual = useGreaterOrEqual()
defineOptions({
  name: 'QlButton'
})

const arr = ref('')
console.log(arr.value)
</script>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { useGreaterOrEqual, useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlPagination',
})
const props = defineProps({
  autoScroll: {
    type: Boolean,
    default: true,
  },
  scrollEl: {
    type: String,
    default: 'main',
  },
})
const emit = defineEmits(['change'])
const greaterOrEqual = useGreaterOrEqual()
const ns = useNamespace('pagination')
// 事件处理
function change() {
  emit('change')
  if (props.autoScroll) {
    document.querySelector(props.scrollEl)?.scroll({ behavior: 'smooth', top: 0 })
  }
}
</script>

<template>
  <ElPagination
    v-if="greaterOrEqual"
    :class="ns.b()"
    @change="change"
  />
  <ElPagination
    v-else
    :class="ns.b()"
    size="small"
    background
    :pager-count="5"
    layout="prev, pager, next"
    style="margin: auto;"
    @change="change"
  />
</template>

<style scoped lang="scss"></style>

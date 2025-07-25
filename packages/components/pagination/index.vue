<template>
  <el-pagination
    class="pagination"
    v-if="greaterOrEqual"
    @change="change"
  />
  <el-pagination
    class="pagination"
    v-else
    size="small"
    background
    :pager-count="5"
    layout="prev, pager, next"
    style="margin: auto;"
    @change="change"
  />
</template>
<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'

const greaterOrEqual = useGreaterOrEqual()
defineOptions({
  name: 'QlPagination'
})

const props = defineProps({
  autoScroll: {
    type: Boolean,
    default: true
  },
  scrollEl: {
    type: String,
    default: '.el-main'
  }
})

const emit = defineEmits(['change'])

// 事件处理
const change = () => {
  emit('change')
  if (props.autoScroll) {
    document.querySelector(props.scrollEl)?.scroll({ behavior: 'smooth', top: 0 })
  }
}
</script>

<style scoped lang="scss">
.pagination{
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>

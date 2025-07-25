<template>
  <ql-pagination
    v-model:current-page="pagination.page"
    v-model:page-size="pagination.limit"
    :total="pagination.total"
    :disabled="loading"
    @change="paginationChange"
    scroll-el="html"
  />
</template>
<script setup lang="ts">
// 模拟接口延时
import { delayed } from '@/utils'
const timedelay = delayed()

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 50
})
const loading = ref(false)

const paginationChange = async () => {
  loading.value = true
  await timedelay().finally(() => {
    loading.value = false
  })
  console.log(pagination)
}
</script>

<style scoped lang='scss'>

</style>

<!-- 增减组件示例 -->
<script setup lang="ts">
const options = {
  value: '',
}

const arr = reactive([{ ...options }])
</script>

<template>
  <ql-plus-minus
    v-model="arr"
    :max="4"
    :options="options"
  >
    <template #default="scope">
      <el-input
        v-model="scope.data.value"
        placeholder="Please input"
      />
    </template>
  </ql-plus-minus>

  {{ arr }}
</template>

<style scoped lang='scss'>

</style>

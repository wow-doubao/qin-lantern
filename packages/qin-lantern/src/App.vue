<script setup lang="ts">
// 抽屉Hook
const show = ref(false)
// 打开抽屉
const open = () => {
  show.value = true
}

// 关闭抽屉
const confirm = () => {
  show.value = false
}
</script>

<template>
  <el-button @click="open">
    抽屉展示
  </el-button>

  <ql-drawer
    v-model="show"
    title="提示"
    :confirm="confirm"
  >
    我是内容
  </ql-drawer>
</template>

<style scoped lang='scss'></style>

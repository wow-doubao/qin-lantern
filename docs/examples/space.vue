<script setup lang="ts">
</script>

<template>
  <ql-space>
    <div
      v-for="item in 10"
      :key="item"
      style="background-color: #FAFAFA;"
    >
      {{ item }}
    </div>
  </ql-space>
</template>

<style scoped lang='scss'></style>

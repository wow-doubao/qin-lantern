<template>
  <el-card shadow="hover">
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <el-space
      direction="vertical"
      alignment="flex-start"
      class="space"
      prefix-cls="space"
      size="large"
    >
      <div
        v-if="$slots.search"
        class="search"
      >
        <slot name="search" />
      </div>

      <slot />
    </el-space>

    <template
      #footer
      v-if="$slots.footer"
    >
      <slot name="footer" />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElSpace } from 'element-plus'
defineOptions({
  name: 'QlCard'
})
</script>

<style scoped lang="scss">
.space{
  display: flex;
  :deep(.space__item) {
    width: 100%;
  }

  .search {
    :deep(.el-form-item) {
      margin: 10px 0;
    }
  }
}
</style>

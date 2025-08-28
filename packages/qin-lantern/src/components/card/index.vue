<script setup lang="ts">
import { ElCard, ElSpace } from 'element-plus'

defineOptions({
  name: 'QlCard',
})
</script>

<template>
  <ElCard shadow="hover">
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <ElSpace
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
    </ElSpace>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </ElCard>
</template>

<style scoped lang="scss">
.space{
  display: flex;
  :deep(.space__item) {
    width: 100%;
  }

  .search {
    :deep(.ql-formList) {
      .el-form-item {
        margin: 10px 0;
      }
    }
  }
}
</style>

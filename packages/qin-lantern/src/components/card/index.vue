<script setup lang="ts">
import { ElCard, ElSpace } from 'element-plus'
import { useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlCard',
})

const ns = useNamespace('card')
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
      :class="ns.e('space')"
      :prefix-cls="ns.b('space')"
      size="large"
    >
      <div
        v-if="$slots.search"
        :class="ns.e('search')"
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

<style scoped lang="scss"></style>

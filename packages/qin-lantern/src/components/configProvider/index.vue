<script setup lang="ts">
import type { QlUploadConfig } from 'qin-lantern/hooks'
import type { QlLanguage } from 'qin-lantern/locale'
import { ElConfigProvider } from 'element-plus'
import { localeContextKey, uploadContextKey } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlConfigProvider',
})

const props = defineProps({
  qlLocale: { // 多语言
    type: Object,
    required: false,
    default: null,
  },
  qlUpload: { // 上传配置
    type: Object,
    required: false,
    default: null,
  },
})

provide(localeContextKey, computed(() => props.qlLocale as QlLanguage))
provide(uploadContextKey, computed(() => props.qlUpload as QlUploadConfig))
</script>

<template>
  <ElConfigProvider>
    <slot />
  </ElConfigProvider>
</template>

<style scoped lang="scss"></style>

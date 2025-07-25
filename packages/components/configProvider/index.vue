<template>
  <el-config-provider>
    <slot />
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { localeContextKey, uploadContextKey, QlUploadConfig } from 'qin-lantern/hooks'
import type { QlLanguage } from 'qin-lantern/locale'
defineOptions({
  name: 'QlConfigProvider'
})

const props = defineProps({
  qlLocale: { // 多语言
    type: Object,
    required: false,
    default: null
  },
  qlUpload: { // 上传配置
    type: Object,
    required: false,
    default: null
  }
})

provide(localeContextKey, computed(() => props.qlLocale as QlLanguage))
provide(uploadContextKey, computed(() => props.qlUpload as QlUploadConfig))

</script>

<style scoped lang="scss"></style>

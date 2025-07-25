<template>
  <el-dialog
    ref="dialog"
    :fullscreen="!greaterOrEqual"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-model="visible"
  >
    <template
      #header="slotProps"
    >
      <slot
        name="header"
        v-bind="slotProps"
      />
    </template>
    <slot />
    <template
      v-if="props.footer"
      #footer
    >
      <el-button
        @click="handleCancel"
      >
        {{ props.cancelText || t('ql.dialog.cancel') }}
      </el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleConfirm"
      >
        {{ loading?t('ql.dialog.loading'):props.sureText || t('ql.dialog.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElDialog, ElButton } from 'element-plus'
import { useLocale, useGreaterOrEqual } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlDialog'
})

const { t } = useLocale()
const greaterOrEqual = useGreaterOrEqual()

const props = defineProps({
  // 是否展示footer
  footer: {
    type: Boolean,
    default: true
  },
  sureText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  // 点击确认
  confirm: {
    type: Function,
    default: () => Promise.resolve()
  }
})

// 双向数据绑定
const visible = defineModel({
  type: Boolean,
  default: false
})

// 取消
const dialog = ref(null)
const handleCancel = () => {
  if (dialog.value) visible.value = false
}

const loading = ref(false)
const handleConfirm = async () => {
  loading.value = true
  await props.confirm().finally(() => {
    loading.value = false
  })
}
</script>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ElButton, ElDialog } from 'element-plus'
import { useGreaterOrEqual, useLocale } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlDialog',
})

const props = defineProps({
  // 是否展示footer
  footer: {
    type: Boolean,
    default: true,
  },
  sureText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },
  // 点击确认
  confirm: {
    type: Function,
    default: () => Promise.resolve(),
  },
})
const { t } = useLocale()
const greaterOrEqual = useGreaterOrEqual()

// 双向数据绑定
const visible = defineModel({
  type: Boolean,
  default: false,
})

// 取消
const dialog = ref(null)
function handleCancel() {
  if (dialog.value)
    visible.value = false
}

const loading = ref(false)
async function handleConfirm() {
  loading.value = true
  await props.confirm().finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <ElDialog
    ref="dialog"
    v-model="visible"
    :fullscreen="!greaterOrEqual"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
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
      <ElButton
        @click="handleCancel"
      >
        {{ props.cancelText || t('ql.dialog.cancel') }}
      </ElButton>
      <ElButton
        type="primary"
        :loading="loading"
        @click="handleConfirm"
      >
        {{ loading ? t('ql.dialog.loading') : props.sureText || t('ql.dialog.confirm') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ElButton, ElDrawer } from 'element-plus'
import { useGreaterOrEqual, useLocale, useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlDrawer',
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
const ns = useNamespace('drawer')

// 双向数据绑定
const visible = defineModel({
  type: Boolean,
  default: false,
})

// 取消
const drawer = ref(null)
function handleCancel() {
  if (drawer.value)
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
  <ElDrawer
    ref="drawer"
    v-model="visible"
    :class="ns.b()"
    :size="greaterOrEqual ? void 0 : '100%'"
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
  </ElDrawer>
</template>

<style scoped lang="scss">
</style>

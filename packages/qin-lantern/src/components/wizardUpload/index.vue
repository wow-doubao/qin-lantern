<script setup lang="ts">
import { Minus, Plus, Upload, View } from '@element-plus/icons-vue'
import { useDialog } from 'qin-lantern'
import { useLocale } from 'qin-lantern/hooks'
import { watchEffect } from 'vue'
import UploadDialog from './components/uploadDialog.vue'
import ViewDialog from './components/viewDialog.vue'

defineOptions({
  name: 'QlWizardUpload',
})

const { action, headers, type, size, max } = defineProps({
  action: {
    type: String,
    default: void 0,
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'image',
    validator: (value: 'image' | 'video' | 'file') => ['image', 'video', 'file'].includes(value),
  },
  size: { // 文件大小M
    type: Number,
    default: 8,
  },
  max: { // 最大容量
    type: Number,
    default: null,
  },
})
const { t } = useLocale()

provide('type', type)
provide('size', size)

interface UploadTypeOption {
  label: string
  value: 'image' | 'video' | 'file'
}
const types: UploadTypeOption[] = [{
  label: t('ql.wizardUpload.types.image'),
  value: 'image',
}, {
  label: t('ql.wizardUpload.types.video'),
  value: 'video',
}, {
  label: t('ql.wizardUpload.types.file'),
  value: 'file',
}]

const modelValue = defineModel<string[]>({
  type: Array,
  default: () => [''],
})

watchEffect(() => {
  if (modelValue.value.length === 0) {
    modelValue.value = ['']
  }
})

function handleAdd(index: number) {
  modelValue.value.splice(index + 1, 0, '')
}

function handleRemove(index: number) {
  modelValue.value.splice(index, 1)
}

const { show, AOP } = useDialog()

let sortIndex = 0
const handleUpload = AOP((index) => {
  sortIndex = index
})

const success = AOP((data) => {
  data.forEach((item: Record<string, any>, i: number) => {
    modelValue.value[i + sortIndex] = item.url
  })
})

const { show: previewShow, AOP: previewAOP } = useDialog()
const previewUrl = ref('')
const handlePreview = previewAOP((data) => {
  previewUrl.value = data
})

function plusShow(i: number) {
  const flag = i === modelValue.value.length - 1
  return max ? modelValue.value.length < max && flag : flag
}
</script>

<template>
  <div class="flex flex-col gap-6px">
    <div
      v-for="(item, i) in modelValue"
      :key="i"
    >
      <div class="flex flex-col gap-6px">
        <el-button-group>
          <el-button
            type="primary"
            :icon="Upload"
            @click="handleUpload(i)"
          >
            {{ t('ql.wizardUpload.upload') }}
          </el-button>
          <el-button
            type="primary"
            :icon="View"
            :disabled="!item"
            @click="handlePreview(item)"
          >
            {{ t('ql.wizardUpload.preview') }}
          </el-button>
          <el-button
            v-if="plusShow(i)"
            type="primary"
            :icon="Plus"
            @click="handleAdd(i)"
          />
          <el-button
            v-if="modelValue.length !== 1"
            type="primary"
            :icon="Minus"
            @click="handleRemove(i)"
          />
        </el-button-group>
        <el-input
          v-model="modelValue[i]"
          :placeholder="t('ql.wizardUpload.placeholder', { type: types.find(item => item.value === type)!.label })"
        />
      </div>
    </div>
  </div>

  <UploadDialog
    v-model="show"
    :action="action"
    :headers="headers"
    @success="success"
  />
  <ViewDialog
    v-model="previewShow"
    :url="previewUrl"
  />
</template>

<style lang="scss" scoped>
</style>

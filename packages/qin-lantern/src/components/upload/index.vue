<script setup lang="ts">
import type { UploadFile, UploadFiles, UploadRawFile, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ElIcon, ElImage, ElMessage, ElUpload } from 'element-plus'
import { QlDialog } from 'qin-lantern'
import { useLocale, useNamespace, useUpload } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlUpload',
})
const props = defineProps({
  // 展示的数据
  modelValue: {
    type: String,
    default: '',
  },
  // 是否上传
  disabled: {
    type: Boolean,
    default: false,
  },
  // 允许上传文件的最大数量
  limit: {
    type: Number,
    default: null,
  },
  // 允许上传的文件大小(MB)
  size: {
    type: Number,
    default: null,
  },
})
const emit = defineEmits(['update:modelValue', 'success'])
const { t } = useLocale()
const uploadConfig = useUpload()
const ns = useNamespace('upload')

const fileList = ref<UploadUserFile[]>([])

// 判断隐藏上传按钮
const picture = ref<typeof ElUpload>()
const stopStyle = watch(() => [...fileList.value], async () => {
  if (props.disabled)
    return
  await nextTick()
  if (!picture.value)
    return
  const uploadElement = (picture.value as any).$el.firstChild.lastChild
  if (props.limit && fileList.value.length > props.limit - 1) {
    uploadElement.style.display = 'none'
  }
  else {
    uploadElement.style.display = 'inline-flex'
  }
})

const stopProp = watch(() => props.modelValue, () => {
  if (!props.modelValue) {
    fileList.value = []
  }
  else {
    if (fileList.value.length)
      return
    props.modelValue.split(',').forEach((url) => {
      fileList.value.push({
        name: '图片',
        url,
      })
    })
  }
}, { immediate: true })

onUnmounted(() => {
  stopStyle()
  stopProp()
})
// 上传前校验
function beforeUpload(file: UploadRawFile) {
  const fileSize = Number(file.size / 1024 / 1024)
  if (props.size && (fileSize > props.size)) {
    ElMessage({
      type: 'warning',
      message: `${t('ql.upload.fileSize')}${props.size}MB`,
    })
    return false
  }
}
// 上传成功
function handleSuccess(_res: any, _file: UploadFile, fileList: UploadFiles) {
  dataMmit(fileList)
}
// 移除
function remove(_file: UploadFile, fileList: UploadFiles = []) {
  dataMmit(fileList)
}
// 上传失败
function handleError() {
  ElMessage({
    type: 'error',
    message: t('ql.upload.uploadError'),
  })
}

// 预览
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
function preview(file: UploadFile) {
  if (file.url) {
    dialogImageUrl.value = file.url
  }
  else {
    dialogImageUrl.value = fileList.value[0]?.url as string
  }
  dialogVisible.value = true
}

// 事件下发
function dataMmit(fileList: UploadUserFile[]) {
  const arr = fileList.map((item) => {
    return item.response ? (item.response as Record<string, any>).url : item.url
  })
  emit('update:modelValue', arr.join(','))
  emit('success', arr)
}

// 暴漏事件
const abort = (...arg: any[]) => picture.value?.abort(...arg)
const submit = (...arg: any[]) => picture.value?.submit(...arg)
const clearFiles = (...arg: any[]) => picture.value?.clearFiles(...arg)
const handleStart = (...arg: any[]) => picture.value?.handleStart(...arg)
const handleRemove = (...arg: any[]) => picture.value?.handleRemove(...arg)

defineExpose({
  abort,
  submit,
  clearFiles,
  handleStart,
  handleRemove,
})
</script>

<template>
  <div :class="ns.b()">
    <template v-if="props.disabled">
      <ElImage
        v-for="item in fileList"
        :key="item.url"
        :src="item.url"
        :class="ns.e('img')"
        :preview-src-list="[item.url || '']"
      />
    </template>
    <template v-else>
      <ElUpload
        ref="picture"
        v-model:file-list="fileList"
        v-bind="{ ...uploadConfig, ...$attrs }"
        list-type="picture-card"
        :limit="props.limit"
        :on-success="handleSuccess"
        :on-remove="remove"
        :on-preview="preview"
        :on-error="handleError"
        :before-upload="beforeUpload"
      >
        <ElIcon><Plus /></ElIcon>
      </ElUpload>
      <QlDialog v-model="dialogVisible">
        <img
          style="width: 100%;"
          :src="dialogImageUrl"
          alt=""
        >
      </QlDialog>
    </template>
  </div>
</template>

<style scoped lang='scss'></style>

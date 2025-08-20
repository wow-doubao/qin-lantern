<script setup lang="ts">
import type { UploadFile, UploadRawFile, UploadUserFile } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElUpload } from 'element-plus'
import { merge } from 'lodash-unified'
import { QlDialog } from 'qin-lantern'
import { useLocale, useUpload } from 'qin-lantern/hooks'

const props = defineProps({
  action: {
    type: String,
    default: void 0,
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['success'])

const { t } = useLocale()
const uploadConfig = useUpload()

const fileList = ref<UploadUserFile[]>([])

const type = inject<string>('type')
const size = inject<number>('size', 8)

function beforeUpload(rawFile: UploadRawFile) {
  // console.log(rawFile)
  switch (type) {
    case 'image':
      if (!rawFile.type.includes('image')) {
        ElMessage.warning(t('ql.wizardUpload.imageFormat'))
        return false
      }
      break
    case 'video':
      if (!rawFile.type.includes('video')) {
        ElMessage.warning(t('ql.wizardUpload.videoFormat'))
        return false
      }
      break
  }

  if (rawFile.size / 1024 / 1024 > size) {
    ElMessage.warning(`${rawFile.name}${t('ql.upload.fileSize')} ${size}MB`)
    return false
  }
  return true
}

// 上传失败
function handleError() {
  ElMessage({
    type: 'error',
    message: t('ql.upload.uploadError'),
  })
}

let index = 0
function handleSuccess() {
  index++
  if (index === fileList.value.length) {
    emit('success', fileList.value.map(item => ({ url: (item.response as Record<string, any>).url })))
  }
}

// 图片预览
const dialogVisible = ref(false)

const srcList = ref<string[]>([])
const src = ref('')
function handlePictureCardPreview(uploadFile: UploadFile) {
  if (type !== 'image')
    return
  src.value = uploadFile.url as string
  srcList.value = fileList.value.map(item => item.url as string)
  dialogVisible.value = true
}

function handleDialogOpen() {
}

const uploadRef = ref<typeof ElUpload>()
async function confirm() {
  if (fileList.value.length !== 0) {
    // ElMessage.warning('请选择要上传文件')
    // return
    uploadRef.value?.submit()
  }
  // ElMessage.success(props.data.id ? '修改成功' : '添加成功')
  // emit('success')
}

function handleDialogClosed() {
  fileList.value = []
  index = 0
}
</script>

<template>
  <QlDialog
    :title="t('ql.wizardUpload.upload')"
    :confirm="confirm"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <ElUpload
      ref="uploadRef"
      v-model:file-list="fileList"
      :auto-upload="false"
      :drag="type !== 'image'"
      :list-type="type === 'image' ? 'picture-card' : 'text'"
      v-bind="merge(uploadConfig, props)"
      multiple
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
    >
      <el-icon class="el-icon--upload">
        <Plus v-if="type === 'image'" />
        <UploadFilled v-else />
      </el-icon>
      <div
        v-if="type !== 'image'"
        class="el-upload__text"
      >
        {{ t('ql.wizardUpload.drag') }}
      </div>
    </ElUpload>

    <el-image-viewer
      v-if="dialogVisible"
      show-progress
      :url-list="srcList"
      :initial-index="srcList.indexOf(src)"
      @close="dialogVisible = false"
    />
  </QlDialog>
</template>

<style scoped lang='scss'>

</style>

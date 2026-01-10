<!--  -->
<script setup lang="ts">
import { useNamespace } from 'qin-lantern/hooks'
import { inject } from 'vue'

const { url } = defineProps({
  url: {
    type: String,
    default: '',
  },
})

// import useThemeStore from '@/store/theme'

// const themeStore = useThemeStore()
const type = inject('type')
const ns = useNamespace('wizard-upload')
</script>

<template>
  <el-dialog destroy-on-close>
    <img
      v-if="type === 'image'"
      :class="ns.e('view-image')"
      :src="url"
    >
    <video
      v-if="type === 'video'"
      :class="ns.e('view-video')"
      controls
    >
      <source
        :src="url"
      >
    </video>
    <iframe
      v-if="type === 'file'"
      :class="ns.e('view-file')"
      :src="`https://view.officeapps.live.com/op/embed.aspx?src=${url}`"
    />
  </el-dialog>
</template>

<style scoped lang='scss'>

</style>

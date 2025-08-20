<!--  -->
<script setup lang="ts">
const { url } = defineProps({
  url: {
    type: String,
    default: '',
  },
})

// import useThemeStore from '@/store/theme'

// const themeStore = useThemeStore()
const type = inject('type')
</script>

<template>
  <el-dialog destroy-on-close>
    <img
      v-if="type === 'image'"
      class="w-full"
      :src="url"
    >
    <video
      v-if="type === 'video'"
      class="w-full"
      controls
    >
      <source
        :src="url"
      >
    </video>
    <iframe
      v-if="type === 'file'"
      class="w-full h-600px"
      :src="`https://view.officeapps.live.com/op/embed.aspx?src=${url}`"
    />
  </el-dialog>
</template>

<style scoped lang='scss'>

</style>

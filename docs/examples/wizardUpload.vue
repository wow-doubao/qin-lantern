<!--  -->
<script setup lang="ts">
// import { QlWizardUpload } from 'qin-lantern'

const value = ref([''])
</script>

<template>
  <div class="">
    <ql-config-provider
      :ql-upload="{
        action: 'https://finance.swtsk.com/oss/upload',
      }"
    >
      <QlWizardUpload v-model="value" />
    </ql-config-provider>
  </div>
</template>

<style scoped lang='scss'>

</style>

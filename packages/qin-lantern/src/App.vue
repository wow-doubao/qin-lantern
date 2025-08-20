<!--  -->
<script setup>
const value = ref([''])
</script>

<template>
  <div class="">
    {{ value }}
    <ql-config-provider
      :ql-upload="{
        action: 'https://finance.swtsk.com/oss/upload',
      }"
    >
      <QlWizardUpload
        v-model="value"
      />
    </ql-config-provider>
  </div>
</template>

<style scoped lang='scss'>

</style>

<template>
  <ql-card>
    <template #header>
      header
    </template>

    <template #search>
      <el-form
        style="background-color: #FAFAFA;"
        :inline="true"
        :model="formInline"
      >
        <el-form-item label="Approved by">
          <el-input
            v-model="formInline.user"
            placeholder="Approved by"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            Query
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <div>
      内容1
    </div>

    <div>
      内容2
    </div>

    <div>
      内容3
    </div>

    <template #footer>
      footer
    </template>
  </ql-card>
</template>

<script setup lang="ts">
const formInline = reactive({
  user: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped lang='scss'></style>

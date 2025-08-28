<script setup lang="ts">
const formInline = reactive({
  user: '',
})

const options = reactive([
  {
    label: 'Approved by',
    key: 'user',
    type: 'input',
  },
])

function onSubmit() {
  console.log('submit!')
}
</script>

<template>
  <QlCard>
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

      <br>

      <ql-form-list
        v-model="formInline"
        style="background-color: #FAFAFA;"
        :options="options"
        :col="{ xs: 12 }"
      >
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            Query
          </el-button>
        </el-form-item>
      </ql-form-list>
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
  </QlCard>
</template>

<style scoped lang='scss'></style>

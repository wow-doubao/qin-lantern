<!--  -->
<script setup>
const listParams = ref({})

const formData = ref({})
const options = reactive([
  {
    label: '模版名称',
    key: 'name',
    type: 'input',
  },
  {
    label: '模版类型',
    key: 'type',
    type: 'input',
  },
])
</script>

<template>
  <div class="">
    {{ value }}
    <ql-card>
      <template #search>
        <el-form
          inline
          :model="listParams"
        >
          <el-form-item label="用户昵称：">
            <el-input
              v-model="listParams.username"
              clearable
              placeholder="请输入用户昵称"
            />
          </el-form-item>
          <el-form-item>
            <el-button>
              查询
            </el-button>
          </el-form-item>
        </el-form>

        <ql-form-list
          v-model="formData"
          :options="options"
        >
          <el-form-item>
            <el-button>
              查询
            </el-button>
          </el-form-item>
        </ql-form-list>
      </template>
    </ql-card>
  </div>
</template>

<style scoped lang='scss'>

</style>

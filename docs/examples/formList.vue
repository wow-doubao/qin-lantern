<script setup lang="ts">
import type { FormListOptions } from 'qin-lantern'
import { QlFormList } from 'qin-lantern'

// 模拟接口延时
import { delayed } from './utils'

const timedelay = delayed()

const loading = ref(false)
onMounted(async () => {
  loading.value = true
  await timedelay().finally(() => {
    loading.value = false
  })
})

const formData = reactive({
  input: '',
  inputNumber: null,
  radioGroup: '1',
  switch: 0,
  autocomplete: '',
  select: '1',
  cascader: ['1', '2', '3'],
  datePicker: ['2022-02-11 12:00:00', '2022-03-16 12:00:00'],
  slot: '',
  extendSlot: '',
  slotA: '',
  upload: '',
})

const options = reactive<FormListOptions>([
  {
    label: 'form表单封装',
    type: 'txt', // 'show'|'txt'|'input'|'inputNumber'|'radioGroup'|'switch'|'autocomplete'|'select'|'cascader'|'datePicker'|'upload'|'slot'
  },
  {
    label: '输入框',
    key: 'input',
    type: 'input',
    // hidden: true, // 是否隐藏
    bind: { // 绑定属性
      type: 'textarea',
    },
    on: { // 绑定事件
      change(data: string | number) {
        console.log(`input change data:${data}`)
      },
    },
    rule: [{ // 验证规则
      required: true,
      message: 'Please input Activity input',
      trigger: 'blur',
    }],
  },
  {
    label: '数字输入框',
    key: 'inputNumber',
    type: 'inputNumber',
    bind: {
      min: 0,
      precision: 2,
    },
    rule: [{
      required: true,
      message: 'Please input Activity inputNumber',
      trigger: 'blur',
    }],
  },
  {
    label: '单选框',
    key: 'radioGroup',
    type: 'radioGroup',
    options: [ // 可以使用el-radio 的所有属性
      {
        value: '1',
        label: 'Option1',
      },
      {
        value: '2',
        label: 'Option2',
        disabled: true,
      },
    ],
    on: {
      change(data: string | number | boolean) {
        console.log(`radioGroup change data:${data}`)
      },
    },
    rule: [{
      required: true,
      message: 'Please input Activity radioGroup',
      trigger: 'change',
    }],
  },
  {
    label: '多选框',
    key: 'checkboxGroup',
    type: 'checkboxGroup',
    options: [ // 可以使用el-checkbox 的所有属性
      {
        value: '1',
        label: 'Option1',
      },
      {
        value: '2',
        label: 'Option2',
        size: 'small',
      },
    ],
  },
  {
    label: 'Switch开关',
    key: 'switch',
    type: 'switch',
    bind: {
      activeText: '是',
      inactiveText: '否',
      activeValue: 1,
      inactiveValue: 0,
    },
  },
  {
    label: '远程搜索',
    key: 'autocomplete',
    type: 'autocomplete',
    bind: {
      // 参考文档fetch-suggestions
      fetchSuggestions: async (_queryString: string, callback: any) => {
        const data = await timedelay([
          { value: 'vue', link: 'https://github.com/vuejs/vue' },
          { value: 'element', link: 'https://github.com/ElemeFE/element' },
          { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        ])
        callback(data)
      },
    },
    rule: [{
      required: true,
      message: 'Please input Activity autocomplete',
      trigger: 'change',
    }],
  },
  // 隐藏交互，type: 'show'之后的数据模式隐藏
  {
    label: '隐藏显示配置项', // 默认显示 更多信息
    type: 'show',
  },
  {
    label: '下拉选择器',
    key: 'select',
    type: 'select',
    bind: {
      filterable: true,
    },
    options: [{ // 可以使用el-option的所有属性
      value: '1',
      label: 'Option1',
    }, {
      value: '2',
      label: 'Option2',
      disabled: true,
    }],
    rule: [{
      required: true,
      message: 'Please input Activity select',
      trigger: 'change',
    }],
  },
  {
    label: '级联选择器',
    key: 'cascader',
    type: 'cascader',
    bind: {
      options: [
        {
          value: '1',
          label: 'Guide',
          children: [{
            value: '2',
            label: 'Disciplines',
            children: [
              {
                value: '3',
                label: 'Consistency',
              },
              {
                value: '4',
                label: 'Feedback',
              },
              {
                value: '5',
                label: 'Efficiency',
              },
              {
                value: '6',
                label: 'Controllability',
              },
            ],
          }],
        },
      ],
    },
    rule: [{
      required: true,
      message: 'Please input Activity cascader',
      trigger: 'change',
    }],
  },
  {
    label: '日期选择器',
    key: 'datePicker',
    type: 'datePicker',
    bind: {
      type: 'datetimerange', // date:单选时间 daterange:范围时间  datetime:单选时间(时分秒) datetimerange:范围时间(时分秒)
      valueFormat: 'YYYY-MM-DD HH:mm:ss', // 绑定值的格式
    },
    rule: [{
      required: true,
      message: 'Please input Activity datePicker',
      trigger: 'change',
    }],
  },
  { // type: 'slot' 插入el-form-item之内
    label: 'slot',
    key: 'slot',
    type: 'slot',
    rule: [{
      required: true,
      message: 'Please input slot',
      trigger: 'blur',
    }],
  },
  { // type: 'extendSlot' 插入el-form之内和el-form-item平级
    key: 'extendSlot',
    type: 'extendSlot',
    col: { sm: 12, lg: 24 },
    hidden: false,
  },

  {
    label: 'slotA',
    key: 'slotA',
    type: 'slot',
    col: { sm: 12, lg: 24 }, // col可以为数字或对象
    rule: [{
      required: true,
      message: 'Please input slotA',
      trigger: 'blur',
    }],
  },
  {
    label: '图片上传',
    key: 'upload',
    type: 'upload',
    col: 24, // 固定某一栏占位
    bind: {
      limit: 1,
    },
    rule: [{
      required: true,
      trigger: 'change',
      validator(_rule: any, value: any, callback: any) {
        if (!value) {
          callback(new Error('请上传图片'))
        }
        else {
          callback()
        }
      },
    }],
  },
])

const form = ref<InstanceType<typeof QlFormList>>()
async function validate() {
  await form.value?.validate()
}
function resetFields() {
  form.value?.resetFields()
}

const flag = ref(false)
function showHidden() {
  flag.value = !flag.value
  /**
   * 多个属性隐藏时, 可传递数组  isHide(['upload'], flag)
   */
  form.value?.isHide(['upload'], flag.value)
}
</script>

<template>
  <ql-card>
    <template #search>
      <!-- col在指定的断点及以上生效
        col默认值 {
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4
        }
      -->
      <QlFormList
        ref="form"
        v-model="formData"
        v-loading="loading"
        :options="options"
        :col="{ xs: 24, sm: 12 }"
      >
        <!-- 插入el-form-item之内  插槽名与key保持一致  即#name  key="name" -->
        <template #slot>
          <el-input
            v-model="formData.slot"
            clearable
            placeholder="请输入slot"
          />
        </template>
        <!-- extendSlot插槽和 el-form-item 平级 可以自定义复杂逻辑 -->
        <template #extendSlot>
          <el-form-item
            label="extendSlot"
            prop="extendSlot"
            :rules="[{
              required: true,
              message: 'Please input extendSlot',
              trigger: 'blur',
            }]"
          >
            <el-input
              v-model="formData.extendSlot"
              clearable
              placeholder="请输入extendSlot"
            />
          </el-form-item>
        </template>

        <template #slotA>
          <el-input
            v-model="formData.slotA"
            clearable
            placeholder="请输入slotA"
          />
        </template>

        <!-- 额外插槽可自定义规则 -->
        <el-form-item>
          <el-button @click="validate">
            校验
          </el-button>
          <el-button @click="resetFields">
            重置
          </el-button>
          <!-- 会重置数据 -->
          <el-button @click="showHidden">
            {{ flag ? '显示' : '隐藏' }}upload
          </el-button>
        </el-form-item>
      </QlFormList>
    </template>
    {{ formData }}
  </ql-card>
</template>

<style scoped lang='scss'></style>

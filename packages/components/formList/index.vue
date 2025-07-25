<template>
  <el-form
    ref="form"
    class="formList"
    :model="formData"
  >
    <el-row :gutter="20">
      <template
        v-for="item in options"
        :key="item.key"
      >
        <!-- show -->
        <template v-if="item.type === 'show'">
          <el-col
            :span="24"
            class="show"
            :class="!active ? 'active' : ''"
            @click="toggle()"
          >
            <el-space
              wrap
              style="height: 50px;"
            >
              {{ item?.label || t('ql.formList.more') }}
              <el-icon>
                <ArrowDown
                  class="icon"
                  :class="active ? 'is-active' : ''"
                />
              </el-icon>
            </el-space>
          </el-col>
        </template>

        <template v-else>
          <!-- title -->
          <el-col
            v-if="item.type === 'txt' && !item.hidden"
            :span="24"
          >
            <div class="info-item-title">
              {{ item?.label }}
            </div>
          </el-col>
          <!-- hidden属性隐藏 -->
          <el-col
            v-else-if="!item.hidden"
            v-bind="mergeCol(item.col)"
          >
            <slot
              v-if="item.type === 'extendSlot'"
              :name="item.key"
            />
            <el-form-item
              v-else
              :ref="(e) => (tags[item.key as string] = e)"
              :prop="item.key"
              :label="item?.label"
              :rules="item.rule"
            >
              <!-- 输入框 -->
              <el-input
                v-if="item.type === 'input'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.input') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 数字输入框 -->
              <el-input-number
                v-if="item.type === 'inputNumber'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.input') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 单选框 -->
              <el-radio-group
                v-if="item.type === 'radioGroup'"
                v-model="formData[item.key as string]"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              >
                <el-radio
                  v-for="childItem in item.options"
                  :key="childItem.value"
                  v-bind="childItem as ElRadioProps"
                >
                  {{ childItem.label }}
                </el-radio>
              </el-radio-group>

              <!-- 多选框 -->
              <el-checkbox-group
                v-if="item.type === 'checkboxGroup'"
                v-model="formData[item.key as string]"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              >
                <el-checkbox
                  v-for="childItem in item.options"
                  :key="childItem.value"
                  v-bind="childItem as ElCheckboxProps"
                />
              </el-checkbox-group>

              <!-- switch开关 -->
              <el-switch
                v-if="item.type === 'switch'"
                v-model="formData[item.key as string]"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 远程搜索输入框 -->
              <el-autocomplete
                v-if="item.type === 'autocomplete'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.input') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 选择器 -->
              <el-select
                v-if="item.type === 'select'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.select') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              >
                <el-option
                  v-for="childItem in item.options"
                  :key="childItem.value"
                  v-bind="childItem as ElOptionProps"
                />
              </el-select>

              <!-- 级联选择器 -->
              <el-cascader
                v-if="item.type === 'cascader'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.select') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 时间选择器 -->
              <el-date-picker
                v-if="item.type === 'datePicker'"
                v-model="formData[item.key as string]"
                :placeholder="t('ql.formList.select') + (item?.label || '')"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 图片上传 -->
              <ql-upload
                v-if="item.type === 'upload'"
                v-model="formData[item.key as string]"
                v-bind="item.bind || {}"
                v-on="item.on || {}"
              />

              <!-- 插槽 -->
              <slot
                v-if="item.type === 'slot'"
                :name="item.key"
              />
            </el-form-item>
          </el-col>
        </template>
      </template>
      <slot />
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { isArray, isString } from 'lodash-es'
import { useToggle } from '@vueuse/core'
import { ElForm, ElFormItem, ElRow, ElCol, ElInput, ElInputNumber, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch, ElAutocomplete, ElSelect, ElOption, ElCascader, ElDatePicker, ElSpace, ElIcon } from 'element-plus'
import type { FormListOptions, Col } from './types'
import { ArrowDown } from '@element-plus/icons-vue'
import { QlUpload } from 'qin-lantern'
import { useLocale } from 'qin-lantern/hooks'

type ElRadioProps = InstanceType<typeof ElRadio>['$props']
type ElCheckboxProps = InstanceType<typeof ElCheckbox>['$props']
type ElOptionProps = InstanceType<typeof ElOption>['$props']

const { t } = useLocale()

defineOptions({
  name: 'QlFormList'
})
// 隐藏显示配置项
const [active, toggle] = useToggle()

const props = defineProps<{
  options: FormListOptions
  col?: Record<string, number>
}>()

const mergeCol = (data: number | Col | void) => {
  return data ? responsive(data) : responsive(props.col)
}

// 移动优先断点系统
const responsive = (data: Col | void | number) => {
  if (typeof data === 'number') {
    return {
      xs: data,
      sm: data,
      md: data,
      lg: data,
      xl: data
    }
  }

  const obj = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 4
  }
  if (!data) return obj

  if (data.xs) {
    obj.xs = data.xs
    obj.sm = data.xs
    obj.md = data.xs
    obj.lg = data.xs
    obj.xl = data.xs
  }
  if (data.sm) {
    obj.sm = data.sm
    obj.md = data.sm
    obj.lg = data.sm
    obj.xl = data.sm
  }
  if (data.md) {
    obj.md = data.md
    obj.lg = data.md
    obj.xl = data.md
  }
  if (data.lg) {
    obj.lg = data.lg
    obj.xl = data.lg
  }
  if (data.xl) {
    obj.xl = data.xl
  }
  return obj
}

// 双向数据绑定数据修改
const formData = defineModel({ type: Object, default: () => ({}) })

// 隐藏显示配置项
const tags = ref<Record<string, any>>({})
const options = ref(props.options)
const isHide = (data: string | string[], flag: boolean) => {
  if (!(isArray(data) || isString(data))) return

  const arr = isString(data) ? [data] : data
  options.value.forEach(item => {
    if (!item.key) return
    if (arr.includes(item.key)) {
      item.hidden = flag
      tags.value[item.key]?.resetField() // 重置当前项
    }
  })
}

// 暴露校验，重置方法
const form = ref<typeof ElForm>()

const validate = (...arg: any[]) => form.value?.validate(...arg)
const validateField = (...arg: any[]) => form.value?.validateField(...arg)
const resetFields = (...arg: any[]) => form.value?.resetFields(...arg)
const scrollToField = (...arg: any[]) => form.value?.scrollToField(...arg)
const clearValidate = (...arg: any[]) => form.value?.clearValidate(...arg)

defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
  isHide
})

</script>

<style scoped lang='scss'>
.formList {
  .info-item-title {
    color: var(--el-color-primary);
    font-size: 18px;
    position: relative;
    padding-left: 10px;
    height: 50px;
    line-height: 50px;

    &::before {
      content: "";
      position: absolute;
      top: 18px;
      left: 1px;
      height: 15px;
      width: 4px;
      border-radius: 1px;
      background-color: var(--el-color-primary);
    }
  }

  :deep(.el-form-item__content > div) {
    width: 100% !important;
  }

  // :deep(.el-input__wrapper) {
  //   width: 100%;
  //   box-sizing: border-box;
  // }

  :deep(.el-col) {
    transition: all 0.28s;
  }

  // 组件展示
  .show {
    overflow: hidden;
    cursor: pointer;
    color: var(--el-color-primary);
  }

  .active~.el-col {
    overflow: hidden;
    height: 0;
    opacity: 0;
  }

  // 图标动画
  .icon {
    transition: transform 0.28s;
  }

  .is-active {
    transform: rotate(-180deg);
  }
}
</style>

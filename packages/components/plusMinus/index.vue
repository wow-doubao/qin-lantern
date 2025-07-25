<template>
  <ql-space>
    <div
      v-for="(item, i) in arr"
      :key="i"
    >
      <div style="display: flex;">
        <div style="flex: 1;margin-right: 8px;">
          <slot
            :data="item"
            :index="i"
          />
        </div>
        <div style="width: 76px;">
          <el-button
            v-if="plusShow(i)"
            :icon="Plus"
            circle
            @click="plus"
          />
          <el-button
            v-if="arr.length !== 1"
            :icon="Minus"
            circle
            @click="minus(i)"
          />
        </div>
      </div>
    </div>
  </ql-space>
</template>
<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { QlSpace } from 'qin-lantern'
import { cloneDeep } from 'lodash-es'
defineOptions({
  name: 'QlPlusMinus'
})

const props = defineProps({
  // 配置项 每次添加到数组中的数据
  options: {
    type: Object,
    default: () => {}
  },
  max: { // 最大容量
    type: Number,
    default: null
  }
})

const emit = defineEmits<{
  plus: []
  minus: [value: any[]]
}>()

// 双向数据绑定数据修改
const arr = defineModel(
  {
    type: Array,
    required: true,
    default: () => []
  }
)

const plus = () => {
  arr.value.push(cloneDeep(props.options))
  emit('plus')
}
const minus = (i: number) => {
  const data = arr.value.splice(i, 1)
  emit('minus', data)
}

const plusShow = (i: number) => {
  const flag = i === arr.value.length - 1
  return props.max ? arr.value.length < props.max && flag : flag
}
</script>

<style scoped lang="scss">
</style>

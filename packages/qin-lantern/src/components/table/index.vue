<script setup lang="ts" generic="T extends Record<string, any>">
import type { TableLabel } from './types.ts'
import { Operation } from '@element-plus/icons-vue'
import { ElButton, ElPopover, ElTable, ElTableColumn, ElTree, ClickOutside as vClickOutside } from 'element-plus'
import { useNamespace } from 'qin-lantern/hooks'
import { computed, nextTick, provide, ref, unref, useSlots, watch } from 'vue'

import QlTableColumn from './tableColumn.vue'

defineOptions({
  name: 'QlTable',
})

const props = defineProps<{
  // 表头
  label: TableLabel[]
  data: T[]
  // 是否有select
  select?: boolean
  // 是否展示动态表头
  popover?: boolean
}>()

defineSlots<{
  [key: string]: (props: any) => any
}>()

const ns = useNamespace('table')

const slots = useSlots()
provide('tableSlots', slots)

const label = ref(props.label)

// 默认选中的树
const defaultChecked = collectVisibleIds(label.value)
function collectVisibleIds(items: TableLabel[]) {
  let labels: string[] = []

  items.forEach((item) => {
    // 检查当前对象的 show 字段
    if (item.show !== false) {
      labels.push(item.label)
    }

    // 如果有 child 字段且是数组，递归处理
    if (Array.isArray(item.child)) {
      labels = labels.concat(collectVisibleIds(item.child))
    }
  })

  return labels
}
// 根据树选项修改表头
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleCheckChange(data: TableLabel) {
  const keys = [...treeRef.value?.getHalfCheckedKeys() || [], ...treeRef.value?.getCheckedKeys() || []]
  data.show = keys?.includes(data.label)
}

// prpper相关
const buttonRef = ref()
const popoverRef = ref()
function onClickOutside() {
  unref(popoverRef).popperRef?.delayHide?.()
}

const tableLabel = computed(() => filterVisibleItems(label.value))

// 过滤树桩结构
function filterVisibleItems(items: TableLabel[]) {
  const result: TableLabel[] = []

  items.forEach((item) => {
    // 检查当前对象的 show 字段
    if (item.show !== false) {
      const newItem = { ...item }

      // 如果有 child 字段且是数组，递归处理
      if (Array.isArray(item.child)) {
        newItem.child = filterVisibleItems(item.child)
      }

      result.push(newItem)
    }
  })

  return result
}

// select筛选
// 选中的所有数据
const selectionData = defineModel<Record<string, any>[]>('selectData', {
  type: Array,
  default: () => [],
})
// 单选 如果存在则删除  不存在添加
function handleSelect(_selection: any[], row: any) {
  const index = selectionData.value.findIndex(item => item.id === row.id)
  if (index === -1) {
    selectionData.value.push(row)
  }
  else {
    selectionData.value.splice(index, 1)
  }
}
// 全选,取消全选当前页数据
function handleSelectAll(selection: any[]) {
  if (selection.length) {
    const ids = selectionData.value.map(item => item.id)
    selectionData.value.push(...selection.filter(item => !ids.includes(item.id)))
  }
  else {
    const ids = props.data.map(item => item.id)
    for (let i = selectionData.value.length - 1; i >= 0; i--) {
      const item = selectionData.value[i]
      if (ids.includes(item?.id)) {
        selectionData.value.splice(i, 1)
      }
    }
  }
}

// 数据改变查询选中状态
const multipleTableRef = ref<typeof ElTable>()
watch(() => props.data, async () => {
  await nextTick()
  const ids = selectionData.value.map(item => item.id)
  props.data.forEach((item) => {
    if (ids.includes(item.id)) {
      multipleTableRef.value?.toggleRowSelection(item)
    }
  })
})

// 向外暴露事件  能够从外部删除数据
function deleteSelect(row: any) {
  const index = selectionData.value.findIndex(item => item.id === row.id)
  if (index === -1)
    return
  selectionData.value.splice(index, 1)
  props.data.forEach((item) => {
    if (item.id === row.id) {
      multipleTableRef.value?.toggleRowSelection(item, false)
    }
  })
}

defineExpose({
  deleteSelect,
})
</script>

<template>
  <div :class="ns.b()">
    <div v-if="props.popover" :class="ns.e('tools')">
      <ElButton
        ref="buttonRef"
        v-click-outside="onClickOutside"
        :icon="Operation"
        circle
      />
      <ElPopover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        trigger="click"
        virtual-triggering
        width="200px"
      >
        <ElTree
          ref="treeRef"
          :data="label"
          show-checkbox
          node-key="label"
          :default-checked-keys="defaultChecked"
          :props="{ label: 'label', children: 'child' }"
          @check-change="handleCheckChange"
        />
      </ElPopover>
    </div>

    <ElTable
      ref="multipleTableRef"
      v-bind="$attrs"
      :data="props.data"
      style="width: 100%"
      border
      row-key="id"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <ElTableColumn
        v-if="props.select"
        type="selection"
        width="55"
      />
      <template v-for="item in tableLabel" :key="item.label">
        <QlTableColumn :table-label="item" />
      </template>
    </ElTable>
  </div>
</template>

<style lang="scss" scoped></style>

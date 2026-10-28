<script setup lang="ts" generic="T extends Record<string, any>">
import type { TableLabel, TableLabelChild } from './types.ts'
import { Operation } from '@element-plus/icons-vue'
import { ElButton, ElPopover, ElTable, ElTableColumn, ElTree, ClickOutside as vClickOutside } from 'element-plus'
import { useGreaterOrEqual, useNamespace } from 'qin-lantern/hooks'
import { useExpose } from 'qin-lantern'

import { computed, provide, ref, unref, useSlots } from 'vue'

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

const greaterOrEqual = useGreaterOrEqual()

const label = ref<TableLabel[]>(props.label)

// 默认选中的树
const defaultChecked: string[] = collectVisibleIds(label.value)
function collectVisibleIds(items: TableLabelChild[]): string[] {
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
function filterVisibleItems(items: TableLabelChild[]): TableLabel[] {
  const result: TableLabel[] = []

  items.forEach((item) => {
    if (item.show !== false) {
      const newItem = { ...item } as TableLabel

      if (Array.isArray(item.child)) {
        newItem.child = filterVisibleItems(item.child)
      }

      result.push(newItem)
    }
  })

  return result
}

const multipleTableRef = ref<typeof ElTable>()

// select筛选  借助 ElTable 的 reserve-selection 实现跨页勾选
// 选中的所有数据
const selectionData = defineModel<Record<string, any>[]>('selectData', {
  type: Array,
  default: () => [],
})
// 勾选状态变化时同步到 v-model
function handleSelectionChange(selection: Record<string, any>[]) {
  selectionData.value = selection
}

// 透传 ElTable 全部官方 Exposes（clearSelection、toggleRowSelection 等），可直接通过 ref 调用
useExpose(multipleTableRef)
</script>

<template>
  <div :class="ns.b()">
    <ElTable
      row-key="id" v-bind="$attrs" ref="multipleTableRef" style="width: 100%" :data="props.data"
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn v-if="props.select" type="selection" reserve-selection align="center" width="55" />
      <!-- 选择器 -->
      <ElTableColumn
        v-if="props.popover" type="index" width="60" align="center"
        :fixed="greaterOrEqual ? 'left' : false"
      >
        <template #header>
          <ElButton ref="buttonRef" v-click-outside="onClickOutside" circle :icon="Operation" />
        </template>
      </ElTableColumn>

      <QlTableColumn v-for="item in tableLabel" :key="item.label" :table-label="item" />
    </ElTable>

    <ElPopover
      ref="popoverRef" :virtual-ref="buttonRef" virtual-triggering width="auto" placement="bottom-start"
      :teleported="false"
    >
      <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <el-checkbox
          v-for="item in checkLabel"
          :key="item.prop"
          v-model="item.show"
          :label="item.label"
        />
      </div> -->
      <ElTree
        ref="treeRef" show-checkbox node-key="label" style="max-width: 320px" :data="label" :props="{
          children: 'child',
        }" :default-checked-keys="defaultChecked" @check-change="handleCheckChange"
      />
    </ElPopover>
  </div>
</template>

<style scoped lang="scss"></style>

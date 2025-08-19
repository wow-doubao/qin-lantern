<!--  -->
<script setup lang="ts">
import type { TableLabel } from './types'
import { ElTableColumn } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlTableColumn',
})

const props = defineProps<{
  // 表头
  tableLabel: TableLabel
}>()
defineSlots<{
  [key: string]: (props: { row: any, column: any, $index: number }) => any
}>()
const greaterOrEqual = useGreaterOrEqual()
</script>

<template>
  <ElTableColumn
    v-bind="props.tableLabel"
    :fixed="greaterOrEqual ? props.tableLabel?.fixed : false"
  >
    <template
      v-if="props.tableLabel.child && props.tableLabel.child.length"
    >
      <QlTableColumn
        v-for="item in props.tableLabel.child"
        :key="item.label"
        :table-label="item"
      >
        <template
          v-for="(_, name) in $slots"
          :key="name"
          #[name]="slotProp"
        >
          <slot
            :name="name"
            v-bind="slotProp"
          />
        </template>
      </QlTableColumn>
    </template>

    <template
      v-if="props.tableLabel?.slot"
      #default="slotProps"
    >
      <slot
        :name="props.tableLabel.prop"
        v-bind="slotProps"
      />
    </template>
  </ElTableColumn>
</template>

<style scoped lang='scss'>

</style>

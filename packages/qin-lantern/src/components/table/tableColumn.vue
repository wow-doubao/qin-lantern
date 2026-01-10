<!--  -->
<script setup lang="ts">
import type { TableLabel } from './types'
import { ElTableColumn } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'
import TableSlot from './slot'

defineOptions({
  name: 'QlTableColumn',
})

const props = defineProps<{
  // 表头
  tableLabel: TableLabel
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
      />
    </template>

    <template
      v-if="props.tableLabel?.slot"
      #default="slotProps"
    >
      <TableSlot
        :name="props.tableLabel.prop"
        :scope="slotProps"
      />
    </template>
  </ElTableColumn>
</template>

<style scoped lang='scss'>

</style>

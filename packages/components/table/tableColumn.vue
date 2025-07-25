<!--  -->
<template>
  <el-table-column
    v-bind="props.tableLabel"
    :fixed="greaterOrEqual? props.tableLabel?.fixed: false"
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
  </el-table-column>
</template>
<script setup lang="ts">
import { ElTableColumn } from 'element-plus'
import { useGreaterOrEqual } from 'qin-lantern/hooks'
import type { TableLabel } from './types'
defineOptions({
  name: 'QlTableColumn'
})

const greaterOrEqual = useGreaterOrEqual()

const props = defineProps<{
  // 表头
  tableLabel: TableLabel,
}>()

</script>

<style scoped lang='scss'>

</style>

<script setup lang="ts">
import sortable from 'sortablejs'

defineOptions({
  name: 'QlDraggable',
})

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
})

// 双向数据绑定
const list = defineModel({
  type: Array,
  default: () => [],
})

onMounted(() => {
  initDraggable()
})

const draggable = ref(null)

function initDraggable() {
  if (!draggable.value) {
    console.log('容器不能为空')
    return
  }
  sortable.create(draggable.value, {
    onUpdate(e) {
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 删除拖拽元素
        const item = list.value.splice(e.oldIndex, 1)[0]
        // 把删除元素放到新位置
        list.value.splice(e.newIndex, 0, item)
      }
    },
    ...props.options,
  })
}
</script>

<template>
  <div ref="draggable">
    <slot />
  </div>
</template>

<style scoped lang="scss">
</style>

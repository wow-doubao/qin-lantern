<script setup lang="ts">
interface Active {
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  name: string
}

const actives = ref<Active[]>([
  {
    type: 'primary',
    name: 'Tag 1',
  },
  {
    type: 'success',
    name: 'Tag 2',
  },
  {
    type: 'info',
    name: 'Tag 3',
  },
  {
    type: 'warning',
    name: 'Tag 4',
  },
  {
    type: 'danger',
    name: 'Tag 5',
  },
])
</script>

<template>
  <ql-draggable
    v-model="actives"
    class="draggable"
    :options="{
      animation: 300,
    }"
  >
    <el-tag
      v-for="item in actives"
      :key="item.name"
      :type="item.type"
    >
      {{ item.name }}
    </el-tag>
  </ql-draggable>

  {{ actives }}
</template>

<style scoped lang='scss'>
.draggable{
  display: flex;
  gap: 0.5rem;
}
</style>

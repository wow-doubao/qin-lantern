<!--  -->
<script setup lang="ts">
function delayed(time: number = 2000) {
  return <T>(data?: T): Promise<T | void> => new Promise((resolve) => {
    const delayedTime = setTimeout(() => {
      resolve(data)
      clearTimeout(delayedTime)
    }, time)
  })
}


const timedelay = delayed()

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    slot: 1,
    slot1: 'slot1',
    id: '1',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    slot: 0,
    slot1: 'slot2',
    id: '2',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    slot: 1,
    slot1: 'slot3',
    id: '3',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    slot: 0,
    slot1: 'slot4',
    id: '4',
  },
]

const tableLabel = reactive([
  {
    label: '折叠显示',
    prop: 'expand',
    type: 'expand',
    width: '100',
    slot: true,
    show: true,
  },
  {
    label: '名字',
    prop: 'name',
  },
  {
    label: '时间',
    prop: 'date',
  },
  {
    label: '地址',
    prop: 'address',
    showOverflowTooltip: true,
  },
  {
    label: '插槽',
    prop: 'slot',
    slot: true,
  },
  {
    label: '多级表头',
    child: [
      {
        label: '名字1',
        prop: 'name',
      },
      {
        label: 'slot1',
        prop: 'slot1',
        slot: true,
      },
    ],
  },
  {
    label: '操作',
    prop: 'handle',
    fixed: 'right',
    width: '100',
    slot: true,
  },
])

const selectData = ref([])

const loading = ref(false)

const list = ref<any[]>([])

const total = ref(0)

const page = ref(1)

const limit = ref(10)

onMounted(async () => {
  loading.value = true
  list.value = await timedelay(tableData).finally(() => {
    loading.value = false
  }) as any[]
  total.value = Math.ceil(Math.random() * 100)
})

function handleUpdate(data: any) {
  console.log(data)
}

function handleSelectionChange(data: any) {
  console.log(data)
}

function change(row: any) {
  console.log(row)
}
</script>

<template>
  <ql-card>
    <!-- selectData双向数据绑定选中的值, 数据中必须有id  ref获取元素deleteSelect事件传入当前row 删除 -->
    <ql-table
      v-model:select-data="selectData"
      v-loading="loading"
      :label="tableLabel"
      :data="list"
      select
      popover
      @selection-change="handleSelectionChange"
    >
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- 在tab中自定义列使用slot  插槽名与prop保持一致  即#name  prop="name" -->
      <template #slot="scope">
        <el-switch
          v-model="scope.row.slot"
          :active-value="1"
          :inactive-value="0"
          @change="change(scope.row)"
        />
      </template>

      <!-- 多级表头插槽 -->
      <template #slot1="scope">
        {{ scope.row.slot1 }}
      </template>

      <template #handle="scope">
        <el-button
          bg
          type="primary"
          @click="handleUpdate(scope)"
        >
          编辑
        </el-button>
      </template>
    </ql-table>

    <ql-pagination
      v-model:current-page="page"
      v-model:page-size="limit"
      :total="total"
      :disabled="loading"
    />

    <div>tableLabel数据:</div>
    {{ tableLabel }}

    <div>selectData数据:</div>
    {{ selectData }}
  </ql-card>
</template>

<style scoped lang="scss"></style>
<!--  -->
<script setup lang="ts">
// 模拟接口延时
import { delayed } from './utils'

const timedelay = delayed()

// 模拟接口数据，共23条，每页10条可分3页，用于演示跨页勾选
const tableData = Array.from({ length: 23 }, (_, i) => ({
  date: '2016-05-03',
  name: `Tom${i + 1}`,
  address: `No. ${i + 1}, Grove St, Los Angeles`,
  slot: `${i + 1}`,
  slot1: `slot1-${i + 1}`,
  id: `${i + 1}`,
}))

const tableLabel = reactive([
  {
    label: '折叠显示',
    prop: 'expand',
    type: 'expand', // 折叠显示的信息
    width: '100',
    slot: true,
    show: true, // 隐藏表头，:popover="true" 动态显示表头
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
    fixed: 'right', // 在移动端下默认变成false
    width: '100',
    slot: true,
  },
])

const tableRef = ref()
const selectData = ref([])
// 演示官方 Exposes：ref 直接调用 toggleRowSelection 取消勾选前三行（跨页也可）
function cancelFirstThree() {
  tableData.slice(0, 3).forEach(row => tableRef.value?.toggleRowSelection(row, false))
}

// 列表数据
const loading = ref(false)

// 列表数据
const list = ref<any[]>([])

// 总条数
const total = ref(0)

// 当前页码
const page = ref(1)

// 每页条数
const limit = ref(10)

// 模拟调用接口，按当前页码切片返回
async function getList() {
  loading.value = true
  list.value = await timedelay(
    tableData.slice((page.value - 1) * limit.value, page.value * limit.value),
  ).finally(() => {
    loading.value = false
  }) as any[]
}

onMounted(() => {
  total.value = tableData.length // 返回总条数
  getList()
})

// 翻页时重新加载数据
watch([page, limit], getList)

function handleUpdate(data: any) {
  console.log(data)
}

function handleSelectionChange(data: any) {
  console.log(data)
}
</script>

<template>
  <ql-card>
    <!-- selectData双向数据绑定选中的值, 数据中必须有id  ref可直接使用ElTable官方方法, 如toggleRowSelection取消勾选 -->
    <ql-table
      ref="tableRef"
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
        {{ scope.row.slot }}
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

    <!-- 先勾选包含前三行的数据，再点击按钮可看到 selectData 中被取消 -->
    <el-button style="margin-top: 12px" @click="cancelFirstThree">
      取消勾选前三行
    </el-button>

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

<!-- 触底加载 -->
<template>
  <ql-card>
    <template #search>
      <el-button @click="reload">
        重置
      </el-button>
      <el-button @click="backTop">
        回到顶部
      </el-button>
      <el-button @click="getHeight">
        可视区域高度：{{ height?.visualHeight }}，内容高度：{{ height?.contentHeight }}
      </el-button>
    </template>

    <ql-paging
      ref="paging"
      v-model="listData"
      height="400px"
      use-chat-record-mode
      @query="query"
    >
      <!-- 聊天记录模式 如果循环内容在盒子内 需要添加flex-direction: column-reverse;倒序 -->
      <div
        class="flex flex-col flex-col-reverse"
      >
        <p
          v-for="(_item, i) in listData"
          :key="i"
        >
          {{ i }}
        </p>
      </div>

    <!-- <template #loading>
      自定义loading
    </template> -->

    <!-- <template #empty>
      自定义空数据占位
    </template> -->
    </ql-paging>
  </ql-card>
</template>
<script setup lang="ts">
// 模拟接口延时
import { delayed } from '@/utils'
import { QlPaging } from 'qin-lantern'
const timedelay = delayed()

const paging = ref<InstanceType<typeof QlPaging>>()

const listData = ref([])
const query = async (page: number, limit: number) => {
  console.log(page, limit) // 每次请求回返回默认的page和limit
  const data = await timedelay(Array.from({ length: 10 }, (_x, i) => i)) as any[]
  paging.value?.complete(data) // 获取到的数据使用complete添加
}

// 重置
const reload = () => {
  paging.value?.reload()
}

// 回到顶部
const backTop = () => {
  paging.value?.backTop()
}

// 获取高度
const height = ref()
const getHeight = async () => {
  height.value = await paging.value?.getHeight()
}
</script>

<style scoped lang='scss'>

</style>

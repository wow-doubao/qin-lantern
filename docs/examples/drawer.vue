<script setup lang="ts">
import { useDialog } from 'qin-lantern'

// 模拟接口延时
import { delayed } from './utils'

const timedelay = delayed()

// 抽屉Hook
const { show, AOP } = useDialog()
// 打开抽屉
const open = AOP((data) => {
  console.log(data)
})

// 关闭抽屉
const confirm = AOP(async () => {
  const data = await timedelay('我是抽屉确认返回的数据')
  console.log(data)
})
</script>

<template>
  <el-button @click="open('打开时传递的数据')">
    抽屉展示
  </el-button>

  <ql-drawer
    v-model="show"
    title="提示"
    :confirm="confirm"
  >
    我是内容
  </ql-drawer>
</template>

<style scoped lang='scss'></style>

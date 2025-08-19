<script setup lang="ts">
import { useDialog } from 'qin-lantern'

// 模拟接口延时
import { delayed } from './utils'

const timedelay = delayed()

// 弹框Hook
const { show, AOP } = useDialog()
// 打开弹框
const open = AOP((data) => {
  console.log(data)
})

// 关闭弹框
const confirm = AOP(async () => {
  const data = await timedelay('我是弹框确认返回的数据')
  console.log(data)
})
</script>

<template>
  <el-button @click="open('打开时传递的数据')">
    弹框展示
  </el-button>

  <ql-dialog
    v-model="show"
    title="提示"
    :confirm="confirm"
  >
    我是内容
  </ql-dialog>
</template>

<style scoped lang='scss'></style>

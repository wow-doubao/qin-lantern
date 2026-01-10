<!-- 触底加载 -->
<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { ElEmpty, ElIcon, ElScrollbar } from 'element-plus'
import { useLocale, useNamespace } from 'qin-lantern/hooks'

defineOptions({
  name: 'QlPaging',
})

const props = defineProps({
  // 自动加载
  auto: {
    type: Boolean,
    default: true,
  },
  // 自定义pageNo
  defaultPageNo: {
    type: [String, Number],
    default: 1,
  },
  // 自定义pageSize
  defaultPageSize: {
    type: [String, Number],
    default: 10,
  },
  // 使用聊天记录模式
  useChatRecordMode: {
    type: Boolean,
    default: false,
  },
  // 是否移动端
  chatMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  query: [page: number, limit: number]
}>()

const { t } = useLocale()
const ns = useNamespace('paging')

const scrollbarRef = ref<typeof ElScrollbar>()
const loadingRef = ref<HTMLDivElement>()
// 获取高度
async function getHeight() {
  await nextTick()
  if (!scrollbarRef.value)
    return Promise.reject(new Error('error for scrollbar'))
  return {
    visualHeight: scrollbarRef.value.wrapRef.clientHeight as number, // 可视区域高度
    contentHeight: scrollbarRef.value.wrapRef.children[0].clientHeight as number, // 内容高度
  }
}
const moreData = ref(true) // 是否有更多数据

const scrollTop = ref(0)
async function scroll(data: {
  scrollTop: number
  scrollLeft: number
}) {
  scrollTop.value = data.scrollTop
  if (!moreData.value)
    return

  const loadingHeight = loadingRef.value?.clientHeight || 0
  // 聊天模式距离顶部loading高度开始加载 pc模式
  if (props.useChatRecordMode && !props.chatMobile) {
    if (data.scrollTop < loadingHeight)
      bottomOut()
    return
  }

  // 正常模式距离底部loading高度开始加载
  const { visualHeight, contentHeight } = await getHeight()
  if (visualHeight + data.scrollTop > contentHeight - loadingHeight)
    bottomOut()
}

const chatMobile = computed(() => props.useChatRecordMode && props.chatMobile)

const loading = ref(false) // 加载状态

const pagination = reactive({
  defaultPageNo: Number(props.defaultPageNo), // 当前页
  defaultPageSize: Number(props.defaultPageSize), // 一页10条
})

// 触底事件
function bottomOut() {
  console.log('触底')
  if (loading.value)
    return
  pagination.defaultPageNo += 1 // 页数+1
  query()
}

// 发送请求
function query() {
  loading.value = true
  emit('query', pagination.defaultPageNo, pagination.defaultPageSize)
}
// 自动加载
onMounted(() => {
  if (props.auto)
    query()
})

// 双向数据绑定数据修改
const listData = defineModel({
  type: Array,
  default: () => [],
})
// 获取数据
async function complete(data: any[]) {
  // 1、缓存旧窗口高度
  const { contentHeight: oldScrollLocal } = await getHeight()
  // 2、添加数据
  if (Array.isArray(data))
    listData.value.push(...data)
  loading.value = false

  // 3、固定滚动条位置 pc模式
  if (listData.value.length && props.useChatRecordMode && !props.chatMobile) {
    const { contentHeight: newScrollLocal } = await getHeight()
    if (scrollbarRef.value) {
      scrollbarRef.value.setScrollTop(newScrollLocal - oldScrollLocal + scrollTop.value)
    }
  }

  // 4、无更多数据，修改状态
  if (!data || data?.length < pagination.defaultPageSize) {
    moreData.value = false
    console.log('没有更多数据了')
    return
  }

  // 5、数据没有铺满时自动请求
  const { visualHeight, contentHeight } = await getHeight()
  if (contentHeight < visualHeight)
    bottomOut()
}

// 重新加载分页数据
function reload() {
  listData.value = [] // 清空数据
  pagination.defaultPageNo = 1 // 重置页数
  moreData.value = true // 重置是否有更多数据
  query() // 重新加载数据
}

// 添加聊天记录，use-chat-record-mode为true时有效
async function addChatRecordData(data: any) {
  if (!props.useChatRecordMode)
    return
  listData.value.unshift(data)

  backTop()
}

// 回到顶部
async function backTop() {
  const { contentHeight } = await getHeight()
  if (!scrollbarRef.value)
    return

  scrollbarRef.value.wrapRef.scroll({ behavior: 'smooth', top: props.useChatRecordMode && !props.chatMobile ? contentHeight : 0 }) // 动画滚动
  // scrollbarRef.value.setScrollTop(0)
}

// 暴露方法
defineExpose({
  complete,
  reload,
  addChatRecordData,
  backTop,
  getHeight,
})
</script>

<template>
  <!-- 空数据占位 -->
  <div
    v-if="!loading && !listData.length"
  >
    <slot
      name="empty"
    >
      <ElEmpty
        description="No Data"
      />
    </slot>
  </div>
  <ElScrollbar
    v-else
    v-bind="$attrs"
    ref="scrollbarRef"
    :style="chatMobile && 'transform: scaleY(-1)'"
    @scroll="scroll"
  >
    <div
      :class="[ns.b(), ns.is('reverse', useChatRecordMode)]"
      :style="chatMobile && 'transform: scaleY(-1)'"
    >
      <slot />

      <!-- loading -->
      <div
        v-if="moreData"
        ref="loadingRef"
      >
        <slot
          v-if="loading"
          name="loading"
        >
          <div
            :class="ns.e('loading')"
          >
            <div
              :class="ns.e('loading-content')"
            >
              <ElIcon class="is-loading" :class="ns.e('loading-icon')">
                <Loading />
              </ElIcon>
              <span>{{ t('ql.paging.loading') }}~</span>
            </div>
          </div>
        </slot>
        <div
          v-else
          :class="[ns.e('more'), ns.e('loading')]"
          @click="bottomOut"
        >
          {{ t('ql.paging.clickMore') }}
        </div>
      </div>
    </div>
  </ElScrollbar>
</template>

<style lang="scss" scoped></style>

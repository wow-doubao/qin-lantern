// 废弃 使用alova usePagination 代替
import type { Ref } from 'vue'

interface UseTableReturnType {
  loading: Ref<boolean> // loading
  list: Ref<any[]> // list
  total: Ref<number> // total
  currentPage: Ref<number> // page
  perPage: Ref<number> // limit
  search: () => void // search
  loadList: () => Promise<void> // loadList
}

export const useTable = (listRequestFn: () => Promise<unknown>, options: {
  immediate?: boolean
  page?: number
  limit?: number
} = {}): UseTableReturnType => {
  const {
    immediate = true,
    page = 1,
    limit = 10,
  } = options

  // 加载态
  const loading: Ref<boolean> = ref(false)

  // 列表数据
  const list: Ref<any[]> = ref([])

  // 总条数
  const total: Ref<number> = ref(0)

  // 当前页码
  const currentPage: Ref<number> = ref(page)

  // 每页条数
  const perPage: Ref<number> = ref(limit)

  // 加载数据
  const loadList = async () => {
    loading.value = true
    await listRequestFn().finally(() => {
      loading.value = false
    })
  }

  // 搜索
  const search = (): void => {
    currentPage.value = 1
    loadList()
  }

  // 监听分页数据改变
  watch([currentPage, perPage], loadList)

  onMounted(() => {
    if (immediate)
      loadList()
  })

  return {
    loading,
    list,
    total,
    currentPage,
    perPage,
    search,
    loadList,
  }
}

import fs from 'node:fs'
import path from 'node:path'

// 文件根目录
const DIR_PATH: string = path.resolve(__dirname, '..', '..')
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST: string[] = [
  'index.md',
  '.vitepress',
  'node_modules',
  '.idea',
  'assets',
]

// 判断是否是文件夹
const isDirectory = (path: string): boolean => fs.lstatSync(path).isDirectory()

// 取差值
function intersections(arr1: string[], arr2: string[]): string[] {
  return Array.from(new Set(arr1.filter(item => !new Set(arr2).has(item))))
}

// 把方法导出直接使用
interface SidebarItem {
  text: string
  items?: SidebarItem[]
  link?: string
}

function getList(params: string[], path1: string, pathname: string): SidebarItem[] {
  // 存放结果
  const res: SidebarItem[] = []
  // 开始遍历params
  for (const file of params) {
    // 拼接目录
    const dir: string = path.join(path1, file)
    // 判断是否是文件夹
    const isDir: boolean = isDirectory(dir)
    if (isDir) {
      // 如果是文件夹,读取之后作为下一次递归参数
      const files: string[] = fs.readdirSync(dir)
      res.push({
        text: file,
        items: getList(files, dir, `${pathname}/${file}`),
      })
    }
    else {
      // 获取名字
      const name: string = path.basename(file)
      // 排除非 md 文件
      const suffix: string = path.extname(file)
      if (suffix !== '.md') {
        continue
      }
      res.push({
        text: name,
        link: `/${pathname}/${name}`,
      })
    }
  }
  // 对name做一下处理，把后缀删除
  res.forEach((item) => {
    item.text = item.text.replace(/\.md$/, '')
  })
  return res
}

export default (pathname: string): SidebarItem[] => {
  // 获取pathname的路径
  const dirPath: string = path.join(DIR_PATH, pathname)
  // 读取pathname下的所有文件或者文件夹
  const files: string[] = fs.readdirSync(dirPath)
  // 过滤掉
  const items: string[] = intersections(files, WHITE_LIST)
  // getList 函数后面会讲到
  return getList(items, dirPath, pathname)
}

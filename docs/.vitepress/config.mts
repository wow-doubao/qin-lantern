import { defineConfig } from 'vitepress'
import autoSetSidebar from './utils/setSidebar'
import { vitePressConfig } from './utils/vitePressConfig'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/qin-lantern/',
  vite: vitePressConfig,
  markdown: {
    lineNumbers: false,
  },
  head: [['link', {
    rel: 'icon',
    href: '/qin-lantern/logo.svg',
  }]],
  title: 'Qin Lantern',
  description: '一套基于Element Plus封装的UI库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/安装', activeMatch: '/guide' },
      { text: '组件', link: '/template/Card 卡片', activeMatch: '/template' },
      { text: 'Hook', link: '/function/index', activeMatch: '/function' },
      { text: 'Utils', link: '/utils/Format 格式化', activeMatch: '/utils' },
    ],

    sidebar: {
      guide: autoSetSidebar('guide'),
      template: autoSetSidebar('template'),
      function: autoSetSidebar('function'),
      utils: autoSetSidebar('utils'),
    },

    outline: {
      label: '页面导航',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wow-doubao/qin-lantern' },
    ],

    footer: {
      copyright: 'Copyright © 2025-present WangZiYi',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
  },
})

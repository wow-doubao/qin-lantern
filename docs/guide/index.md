# 安装

## 使用包管理器
```
# 选择一个你喜欢的包管理器

# NPM
$ npm install qin-lantern

# Yarn
$ yarn add qin-lantern

# pnpm
$ pnpm install qin-lantern
```

## 用法
``` ts
// main.ts
import { createApp } from 'vue'
import QinLantern from 'qin-lantern'
import 'qin-lantern/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(QinLantern)
app.mount('#app')
```

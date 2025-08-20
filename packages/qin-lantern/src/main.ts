import QlUi from 'qin-lantern'
import { createApp } from 'vue'
// import QlUi from '../dist/qin-lantern.js'
import App from './App.vue'

import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(QlUi)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'

createApp(App).use(router).mount('#app')

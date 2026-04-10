import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './router/permission.js'
import pinia from './stores/index.js'
import './assets/iconfont/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './common.js'
import '@/styles/global.css'

const app = createApp(App)
app.config.errorHandler = (err, instance, info) => {
    console.log(err, instance, info)
}
app.config.globalProperties = {
    actuor: 'AsiaLancer',
}
app.directive('highlight', {
    mounted: (el) => {
        el.classList.add('is-highlight')
    }
}).directive('focus', {
    mounted: (el) => {
        el.focus()
    }
})
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia).use(router).use(ElementPlus).mount('#app')

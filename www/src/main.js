import {createApp} from 'vue'
import App from './App.vue'
//引入ElementPlus全部组件及样式
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
//引入axios
import axios from 'axios'
import VueAxios from "vue-axios";
//引入echarts
import ECharts from 'vue-echarts'
//引入路由
import router from './router/router'

const app = createApp(App)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.component('v-chart', ECharts)
app.use(router)
app.mount('#app')

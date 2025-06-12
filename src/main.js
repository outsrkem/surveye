import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'
import './styles/index.less'
import 'element-plus/dist/index.css'
const app = createApp(App)


app.use(ElementPlus)
app.use(Antd)
app.mount('#app')

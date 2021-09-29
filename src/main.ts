import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import mockData from './mockData'
import MyUI from '@/components/index';

const app = createApp(App)

app.config.globalProperties.$mockData = mockData;
app.use(ElementPlus)
app.use(MyUI)

app.mount('#app')

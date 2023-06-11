import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as Elicons from "@element-plus/icons-vue";
//引入
import {createPinia} from 'pinia'
import axios from './http/axios'
import pinia from './utils/pinia'
// import MyComponent from './components/MyComponent.vue'
//创建 Pinia实例

//createApp(App).mount('#app')
const app = createApp(App);//确保 _use_ 路由实例使整个应用支持路由。
// app.component("MyComponent",MyComponent)
app.use(pinia)//挂载pinia 完成
app.use(router)// 挂载router,完成

for (const name in Elicons) {
    app.component(name, Elicons[name]);
  }
app.mount('#app');//挂在index.html
app.config.globalProperties.$axios=axios
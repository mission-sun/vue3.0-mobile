import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import './common/index.less'; // 全局less


createApp(App).use(store).use(router).mount('#app')

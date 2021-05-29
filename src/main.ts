import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
// import './common/index.less'; 
// 全局less
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

// const App1 = () => <div></div>;
// const aa = '1212';
createApp(App)
.use(store)
.use(router)
.mount('#app')

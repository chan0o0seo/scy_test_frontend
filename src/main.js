import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import vueify from './plugins/vuetify'  
const app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = axios;
app.use(vueify);
app.mount('#app');

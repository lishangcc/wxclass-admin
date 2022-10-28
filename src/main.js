import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .mount('#app')

    
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// axios.interceptors.request.use(
//     config => {
//       if (localStorage.getItem('Authorization')) {
//         config.headers.Authorization = localStorage.getItem('Authorization');
//       }
    
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//   });
import { createApp } from 'vue'
import {router} from './router/index'
import {userStore} from './service/userStore'
import App from './App.vue'

createApp(App)
.use(router)
.use(userStore)
.mount('#app')

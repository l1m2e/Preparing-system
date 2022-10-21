import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from '~/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/select/style/css.js'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')

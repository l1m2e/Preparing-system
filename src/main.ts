import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from '~/router'
import directives from '~/directives/index'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/select/style/css.js'
const app = createApp(App)

app.use(ArcoVueIcon)
app.use(router)
app.use(directives)
app.mount('#app')

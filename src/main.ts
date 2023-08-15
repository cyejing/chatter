import { createApp } from 'vue'
import router from './router'
import store from './stores'

import './assets/main.css'

// import App from './TailwindApp.vue'
// import App from './App2.vue'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')

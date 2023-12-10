import { createApp } from "vue";
import "./main.css";

import router from './router';
import store from './stores';
import App from "./App.vue";

const app = createApp(App)
app.use(store)
app.use(router)


app.mount("#app");

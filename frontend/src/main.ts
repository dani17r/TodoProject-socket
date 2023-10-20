import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@views/App.vue";
import router from "@/router";

import "@assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");

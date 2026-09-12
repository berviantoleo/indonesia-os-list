import { createApp } from "vue";
import { createPinia } from "pinia";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/theme-oruga/style.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(Oruga);
app.use(router);

app.mount("#app");

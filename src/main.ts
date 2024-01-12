import { createApp } from "vue";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/theme-oruga/dist/oruga.css";
import router from "./router";
import { store } from "./store";
import App from "./App.vue";

const app = createApp(App);
app.use(Oruga);
app.use(router);
app.use(store);

app.mount("#app");

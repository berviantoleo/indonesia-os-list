import { createApp } from "vue";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga-full.css";
import router from "./router";
import { store } from "./store";
import App from "./App.vue";

const app = createApp(App);
app.use(Oruga);
app.use(router);
app.use(store);

app.mount("#app");

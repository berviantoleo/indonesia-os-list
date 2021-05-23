import Vue from "vue";
import buefy from "buefy";
import "buefy/dist/buefy.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

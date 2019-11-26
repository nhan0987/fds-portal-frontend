import Vue from "vue";
import { sync } from "vuex-router-sync";
import axios from "axios";

import vuetify from "@/plugins/vuetify"; // path to vuetify export
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

sync(store, router);

Vue.config.productionTip = false;

// use if alway need groupId in headers
// axios.defaults.headers.common["groupId"] = window.themeDisplay
//   ? window.themeDisplay.getScopeGroupId()
//   : 42942;
Vue.prototype.$httpAxios = axios;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

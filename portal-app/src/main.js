import Vue from "vue";
import { sync } from "vuex-router-sync";
import axios from "axios";

import vuetify from "@/plugins/vuetify"; // path to vuetify export
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import mixinApp from "./mixin/faq";

sync(store, router);

router.beforeEach(async (to, from, next) => {
  await Vue.nextTick();
  if (
    to.matched.some(record => record.meta.onlyAdmin) &&
    !router.app.isOAdmin
  ) {
    next("/");
  } else {
    next();
  }
});

Vue.config.productionTip = false;

// use if alway need groupId in headers
axios.defaults.headers.common["groupId"] = window.themeDisplay
  ? window.themeDisplay.getScopeGroupId()
  : 42942;
axios.defaults.headers.common["companyId"] = window.themeDisplay
  ? window.themeDisplay.getCompanyId()
  : 42942;
axios.defaults.headers.common["languageCode"] = window.themeDisplay
  ? window.themeDisplay.getLanguageId()
  : 42942;
axios.defaults.headers.common["userId"] = window.themeDisplay
  ? window.themeDisplay.getUserId()
  : 42942;
axios.defaults.headers.common["Authorization"] =
  "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0";
axios.defaults.headers.common["Accept"] = "application/json";
Vue.prototype.$httpAxios = axios;
Vue.mixin(mixinApp);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app-faq");

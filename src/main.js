import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";

import router from "./router";
import { isSubDomain } from "./common/utils";
import appRouter from "./router/app";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";

import "./assets/css/main.scss";

Vue.use(Vuetify);
ApiService.init();

Vue.config.productionTip = false;

const routers = () => {
  let host = location.host;
  if (isSubDomain(host)) {
    return appRouter;
  }
  return router;
};

new Vue({
  router: routers(),
  vuetify,
  render: h => h(App)
}).$mount("#app");

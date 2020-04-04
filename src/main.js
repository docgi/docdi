import Vue from "vue";
import VueMeta from "vue-meta";
import Vuetify from "vuetify";
import App from "./App.vue";

import outerRouter from "./router/outer";
import store from "./store";
import { isSubDomain } from "./common/utils";
import appRouter from "./router/app";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";

import "./assets/css/main.scss";

Vue.use(Vuetify);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});
ApiService.init();

Vue.config.productionTip = false;

const routers = () => {
  let host = location.host;
  if (isSubDomain(host)) {
    return appRouter;
  }
  return outerRouter;
};

new Vue({
  router: routers(),
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

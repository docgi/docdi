import Vue from "vue";
import VueMeta from "vue-meta";
import VueNotification from "vue-notification";
import App from "./App.vue";

import outerRouter from "./router/outer";
import appRouter from "./router/app";
import publicRouter from "./router/public";
import store from "./store";
import { isSubDomain } from "./common/utils";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";
import "./scss/main.scss";

Vue.use(VueNotification);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

ApiService.init();

Vue.config.productionTip = false;

const routers = () => {
  let host = location.host;
  if (isSubDomain(host)) {
    // Check if path start with `public` route prefix return public router object
    let path = location.pathname;
    if (path.startsWith('/p/c/') || path.startsWith('/p/d/')) {
      return publicRouter;
    }

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

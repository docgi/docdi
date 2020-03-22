import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import { isSubDomain } from "./common/utils";
import appRouter from "./router/app";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";

import "./assets/css/main.scss";
import { getToken } from "./common/token.service";

Vue.use(Vuetify);
ApiService.init();

Vue.config.productionTip = false;

const routers = () => {
  let host = location.host;
  if (isSubDomain(host)) {
    appRouter.beforeEach((to, from, next) => {
      if (to.matched.some(record => !record.meta.requiresAuth)) {
        next();
      } else {
        let token = getToken();
        if (token) {
          Vue.axios
            .get("/users/me/", {
              headers: {
                Authorization: "Bearer " + token //the token is a variable which holds the token
              }
            })
            .then(({ data }) => {
              store.commit("setUser", data);
            })
            .catch(() => {
              next({path: "/login", query: { redirect: to.fullPath }});
            });
          next();
        } else {
          next({path: "/login", query: { redirect: to.fullPath }});
        }
      }
    });
    return appRouter;
  }
  return router;
};

new Vue({
  router: routers(),
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

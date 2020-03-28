import Vue from "vue";
import VueMeta from "vue-meta";
import Vuetify from "vuetify";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import {isEmptyObject, isSubDomain} from "./common/utils";
import appRouter from "./router/app";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";

import "./assets/css/main.scss";
import { getToken, removeToken } from "./common/token.service";

Vue.use(Vuetify);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});
ApiService.init();

Vue.config.productionTip = false;

const routers = () => {
  let host = location.host;
  if (isSubDomain(host)) {
    appRouter.beforeEach((to, from, next) => {
      let token = getToken();
      if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("MATCH");
        if (token) {
          let currentUser = store.getters.currentUser;
          if (isEmptyObject(currentUser)) {
            Vue.axios
              .get("/users/me/", {
                headers: {
                  Authorization: "Bearer " + token
                }
              })
              .then(({ data }) => {
                store.commit("setAuth", data);
              })
              .catch(() => {
                removeToken();
                next({path: "/login", query: { redirect: to.fullPath }});
              });
          }
          next();
        } else {
          next({path: "/login", query: { redirect: to.fullPath }});
        }
      } else {
        next();
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

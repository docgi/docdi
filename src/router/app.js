import Vue from "vue";
import VueRouter from "vue-router";
import { getToken, removeToken } from "@/common/token.service";
import store from "@/store";
import { isEmptyObject } from "@/common/utils";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      component: () => import("@/views/app/Index"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          component: () => import("@/views/app/DashBoard")
        },
        {
          path: "/collections",
          component: () => import("@/views/app/Collections")
        }
      ]
    },
    {
      path: "/set-token",
      component: () => import("@/views/app/IframeSetToken"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      component: () => import("@/views/app/InAppLogin"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/reset-password",
      component: () => import("@/views/app/ResetPassword"),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let token = getToken();
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
            next({ path: "/login", query: { redirect: to.fullPath } });
          });
      }
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;

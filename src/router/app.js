import Vue from "vue";
import VueRouter from "vue-router";
import { getToken, removeToken } from "@/common/token.service";
import store from "@/store";
import { isEmptyObject } from "@/common/utils";
import ApiService from "@/common/api.service";

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
          component: () => import("@/views/app/DashBoard"),
          name: "Dashboard"
        },
        {
          path: "search",
          component: () => import("@/views/app/Search"),
          name: "Search"
        },
        {
          path: "notifications",
          component: () => import("@/views/app/Notifications"),
          name: "Notifications"
        },
        {
          path: "send-invitations",
          component: () => import("@/views/app/SendInvitation"),
          name: "SendInvitations"
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
      path: "/auth",
      redirect: "/auth/login",
      component: () => import("@/views/app/auth/Auth"),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: "login",
          component: () => import("@/views/app/auth/InAppLogin")
        },
        {
          path: "reset-password",
          component: () => import("@/views/app/auth/ResetPassword")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = getToken();
    if (token) {
      let currentUser = store.getters.currentUser;
      let currentWorkspace = store.getters.currentWorkspace;

      if (
        isEmptyObject(currentUser) ||
        isEmptyObject(currentWorkspace)
      ) {
        ApiService.setToken();
        Vue.axios
          .get("/stats-workspace/", {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(({ data }) => {
            store.commit("setAuth", data);
          })
          .catch(() => {
            removeToken();
            next({ path: "/auth/login", query: { redirect: to.fullPath } });
          });
      }
      next();
    } else {
      next({ path: "/auth/login", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import ApiService from "@/common/api.service";
import store from "@/store";
import { SET_CURRENT_PATH, SET_AUTH } from "@/store/mutations.type";
import { getToken, removeToken } from "@/common/token.service";
import { isEmptyObject } from "@/common/utils";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/views/app/Index"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "dashboard",
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
        },
        {
          path: "typing",
          component: () => import("@/views/app/Typing"),
          name: "Typing"
        },
        {
          path: "settings",
          component: () => import("@/views/app/Settings"),
          name: "Settings"
        }
      ]
    },
    {
      path: "/set-token",
      name: "IframeSetToken",
      component: () => import("@/views/app/IframeSetToken"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("@/views/app/Logout"),
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
          component: () => import("@/views/app/auth/Login"),
          name: "Login"
        },
        {
          path: "reset-password",
          component: () => import("@/views/app/auth/ResetPassword"),
          name: "ResetPassword"
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.commit(SET_CURRENT_PATH, to.path);
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
            errorHandle: false,
            headers: {
              Authorization: "Bearer " + token
            },
          })
          .then(({ data }) => {
            store.commit(SET_AUTH, data);
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

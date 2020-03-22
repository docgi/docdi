import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/app/Index"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/set-token",
      component: () => import("@/views/app/IframeSetToken"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: () => import("@/views/app/InAppLogin"),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

export default router;

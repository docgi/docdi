import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/app/Index")
    },
    {
      path: "/set-token",
      component: () => import("@/views/app/IframeSetToken")
    }
  ]
});

export default router;

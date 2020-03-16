import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index")
    },
    {
      path: "/create-workspace",
      name: "CreateWorkspace",
      component: () => import("@/views/CreateWorkspace")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login")
    }
  ]
});

export default router;

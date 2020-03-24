import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index"),
      children: [
        {
          path: "/create-workspace",
          name: "CreateWorkspace",
          component: () => import("@/views/createWorkspace/Index")
        },
        {
          path: "/create-workspace/set-password",
          component: () => import("@/views/createWorkspace/FirstSetPassword"),
          name: "SetPassword"
        },
        {
          path: "/login",
          component: () => import("@/views/Login")
        }
      ]
    },
  ]
});

export default router;

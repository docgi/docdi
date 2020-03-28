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
          component: () => import("@/views/auth/CreateWorkspaceView")
        },
        {
          path: "/create-workspace/set-password",
          component: () => import("@/views/auth/FirstSetPassword"),
          name: "SetPassword"
        },
        {
          path: "/checking-workspace",
          component: () => import("@/views/auth/CheckingWorkspace")
        }
      ]
    },
  ]
});

export default router;

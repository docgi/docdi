import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/outer/Index"),
      children: [
        {
          path: "create-workspace",
          name: "CreateWorkspace",
          component: () => import("@/views/outer/CreateWorkspaceView")
        },
        {
          path: "create-workspace/set-password",
          component: () => import("@/views/outer/FirstSetPassword"),
          name: "SetPassword"
        },
        {
          path: "checking-workspace",
          component: () => import("@/views/outer/CheckingWorkspace")
        },
        {
          path: "*",
          component: () => import("@/views/outer/OuterNotFound")
        }
      ]
    },
  ]
});

export default router;

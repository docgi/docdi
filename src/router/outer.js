import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/outer/OuterLayout"),
      children: [
        {
          path: "",
          component: () => import("@/views/outer/Index")
        },
        {
          path: "create-workspace",
          name: "CreateWorkspace",
          component: () => import("@/views/outer/CreateWorkspaceView")
        },
        {
          path: "first-time-password",
          component: () => import("@/views/outer/FirstSetPassword"),
          name: "SetPassword"
        },
        {
          path: "checking-workspace",
          component: () => import("@/views/outer/CheckingWorkspace")
        },
        {
          path: "join-invitations/:workspace/:uuid",
          component: () => import("@/views/outer/JoinInvitation")
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

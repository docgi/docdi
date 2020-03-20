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
      component: () => import("@/views/createWorkspace/Index")
    },
    {
      path: "/create-workspace/set-password",
      component: () => import("@/views/createWorkspace/SetPassword"),
      name: "SetPassword"
    },
    {
      path: "/create-workspace/invite-members",
      component: () => import("@/views/createWorkspace/InviteMember"),
      name: "InviteMembers"
    }
  ]
});

export default router;

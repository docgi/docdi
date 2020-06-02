import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/p/c/:id",
      component: () => import("@/views/public/Collection"),
      name: "Collection"
    },
    {
      path: "/p/d/:id",
      component: () => import("@/views/public/Document"),
      name: "DetailDocument"
    }
  ]
});

export default router;

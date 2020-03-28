<template>
  <div>
    <v-navigation-drawer
      app
      color="#EDF2F7"
      floating
      mobile-break-point="960"
      width="300px"
      v-model="drawer"
    >
      {{ workspace.name }}
      <v-btn to="/collections">xx</v-btn>
      <v-btn to="/dashboard">xddx</v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheNavBar",
  computed: {
    ...mapGetters({ workspace: "currentWorkspace", getDrawer: "getDrawer"}),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      }
    },
  }
};
</script>

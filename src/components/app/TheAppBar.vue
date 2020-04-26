<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="enableDrawer"
    />
    <div class="ml-auto">
      <v-btn
        v-if="currentPath !== '/typing'"
        to="/typing"
        color="primary"
        small
        outlined
      >
        New doc
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheAppBar",
  methods: {
    enableDrawer() {
      this.$store.commit(SET_DRAWER, true);
    }
  },
  computed: {
    ...mapGetters({ currentPath: "getCurrentPath" })
  }
};
</script>

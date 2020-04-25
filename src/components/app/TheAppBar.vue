<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="setDrawer(true)"
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
import { mapMutations, mapGetters } from "vuex";
import { SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheAppBar",
  methods: {
    ...mapMutations([SET_DRAWER])
  },
  computed: {
    ...mapGetters({ currentPath: "getCurrentPath" })
  }
};
</script>

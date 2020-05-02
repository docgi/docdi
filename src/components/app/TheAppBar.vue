<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="enableDrawer"
    />
    <div class="ml-auto">
      <v-btn
        v-if="showNewDocButton()"
        to="/typing"
        color="primary"
        small
        class="text-capitalize"
      >
        <template v-slot:default>
          <v-icon small class="fa fa-plus mr-2" /><span style="padding-top: 2px" >New document</span>
        </template>
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
    },
    showNewDocButton() {
      let hideOnRoutes = [
        '/typing',
        '/collections/[0-9]+'
      ]
      for (const item of hideOnRoutes) {
        let regex = RegExp(item);
        if (regex.test(this.currentPath)) {
          return false;
        }
      }
      return true;
    }
  },
  computed: {
    ...mapGetters({ currentPath: "getCurrentPath" })
  },
};
</script>

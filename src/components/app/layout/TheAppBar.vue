<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="enableDrawer"
    />
    <div class="ml-auto">
      <v-btn
        color="primary"
        small
        class="text-capitalize"
        @click="newDocument"
        v-show="showNewDocButton"
      >
        <template v-slot:default>
          <v-icon small class="fa fa-plus mr-2" />
          <span style="padding-top: 2px">
            New document
          </span>
        </template>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DIALOG, SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheAppBar",
  data() {
    return {
      showSelectCollection: false
    };
  },
  methods: {
    enableDrawer() {
      this.$store.commit(SET_DRAWER, true);
    },
    newDocument() {
      this.$store.commit(SET_DIALOG, { newDocument: true });
    },
    goToNewDocument(colId) {
      this.showSelectCollection = false;
      this.$router.push({
        name: "NewDocument",
        params: { collectionId: colId }
      });
    }
  },
  computed: {
    ...mapGetters({
      currentPath: "getCurrentPath"
    }),
    showNewDocButton() {
      let hideOnRoutes = ["/documents/*", "/settings"];
      for (const item of hideOnRoutes) {
        let regex = RegExp(item);
        if (regex.test(this.currentPath)) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

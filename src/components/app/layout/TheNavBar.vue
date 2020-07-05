<template>
    <v-navigation-drawer
      app
      color="#EDF2F7"
      floating
      mobile-breakpoint="960"
      v-model="drawer"
      width="300"
      class="d-flex"
    >
      <div class="ma-4">
        <div class="d-flex mb-4" @mouseover="showChevronBtn = true" @mouseleave="showChevronBtn = false">
          <workspace-nav-bar-part />
          <v-btn
            v-show="showChevronBtn"
            small
            class="pos-absolute"
            icon
            @click="hideNavBar"
            style="right: 7px; top: 15px"
          >
            <v-icon small class="fa fa-chevron-circle-left" />
          </v-btn>
        </div>

        <v-divider />
        <v-list dense color="#EDF2F7">
          <v-subheader>Quick access</v-subheader>
          <v-list-item-group v-model="quickAccess.model">
            <v-list-item
              v-for="(item, index) in quickAccess.items"
              :key="index"
              :to="item.path"
            >
              <v-list-item-icon class="mr-2">
                <v-icon :class="'fa ' + item.icon" small></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="pb-1">
                <v-list-item-title
                  v-text="item.name"
                  class="font-weight-bold"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <nav-bar-collection-part />
      </div>
    </v-navigation-drawer>

</template>

<script>
import WorkspaceNavBarPart from "@/components/app/layout/WorkspaceLogo";
import NavBarCollectionPart from "@/components/app/layout/NavBarCollectionPart";
import { SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheNavBar",
  components: {
    WorkspaceNavBarPart,
    NavBarCollectionPart
  },
  data() {
    return {
      showChevronBtn: false,
      quickAccess: {
        model: 0,
        items: [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: "fa-home"
          },
          {
            name: "Search",
            path: "/search",
            icon: "fa-search"
          }
        ]
      }
    };
  },
  methods: {
    hideNavBar() {
      this.$store.commit(SET_DRAWER, false);
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.getDrawer;
      },
      set(value) {
        this.$store.commit(SET_DRAWER, value);
      }
    }
  }
};
</script>

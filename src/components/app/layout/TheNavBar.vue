<template>
  <div>
    <v-navigation-drawer
      app
      color="#EDF2F7"
      floating
      mobile-break-point="960"
      v-model="drawer"
      width="300"
    >
      <div class="ma-4">
        <div class="d-flex mb-4">
          <workspace-logo />
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
  </div>
</template>

<script>
import WorkspaceLogo from "@/components/app/WorkspaceLogo";
import NavBarCollectionPart from "@/components/app/layout/NavBarCollectionPart";
import { SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheNavBar",
  components: {
    WorkspaceLogo,
    NavBarCollectionPart
  },
  data() {
    return {
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

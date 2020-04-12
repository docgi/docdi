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

        <v-list dense>
          <v-subheader>Quick access</v-subheader>
          <v-list-item-group v-model="quickAccess.model">
            <v-list-item
              v-for="(item, index) in quickAccess.items"
              :key="index"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon :class="'fa ' + item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="pb-0">
                <v-list-item-title v-text="item.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import WorkspaceLogo from "@/components/app/workspace/WorkspaceLogo";
import { mapGetters } from "vuex";

export default {
  name: "TheNavBar",
  components: {
    WorkspaceLogo
  },
  computed: {
    ...mapGetters({ getDrawer: "getDrawer" }),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      }
    }
  },
  data() {
    return {
      quickAccess: {
        model: 0,
        items: [
          {
            name: "Home",
            path: "/dashboard",
            icon: "fa-home"
          },
          {
            name: "Search",
            path: "/dashboard/search",
            icon: "fa-search"
          },
          {
            name: "Notification",
            path: "/dashboard/notifications",
            icon: "fa-bell"
          }
        ]
      }
    };
  }
};
</script>

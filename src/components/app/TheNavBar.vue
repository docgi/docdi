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
              class="mt-1"
            >
              <v-list-item-icon class="mr-2">
                <v-icon :class="'fa ' + item.icon" small></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="pb-1">
                <v-list-item-title v-text="item.name" class="font-weight-bold"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-list dense color="#EDF2F7">
          <v-subheader>Collections</v-subheader>
          <v-list-item-group>
            <v-list-item
              to="/typing"
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fa fa-pen" small/>
              </v-list-item-icon>
              <v-list-item-content class="pb-1">
                <v-list-item-title v-text="'Typing'" class="font-weight-bold"/>
              </v-list-item-content>
            </v-list-item>

            <v-list-item dense @click="showNewCollectionDialog">
              <v-list-item-icon class="mr-2">
                <v-icon class="fa fa-plus" small/>
              </v-list-item-icon>
              <v-list-item-content class="pb-1">
                <v-list-item-title v-text="'New Collections'"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

      </div>

    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WorkspaceLogo from "@/components/app/workspace/WorkspaceLogo";
import { SET_DIALOG } from "@/store/mutations.type";

export default {
  name: "TheNavBar",
  components: {
    WorkspaceLogo
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
          },
          {
            name: "Notification",
            path: "/notifications",
            icon: "fa-bell"
          },
        ]
      }
    };
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
  methods: {
    showNewCollectionDialog() {
      this.$store.commit(SET_DIALOG, { newCollection: true });
    }
  }
};
</script>

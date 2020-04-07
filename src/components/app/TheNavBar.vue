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
          <v-list-item-group>
            <v-list-item :to="{name: 'SendInvitations'}">
              <v-list-item-icon>
                <v-icon class="fa fa-eye-slash"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Invitations
                </v-list-item-title>
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
import {mapGetters} from "vuex";

export default {
  name: "TheNavBar",
  components: {
    WorkspaceLogo
  },
  computed: {
    ...mapGetters({getDrawer: "getDrawer"}),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      }
    },
  },
  data: () => ({
    item: 1,
    items: [
      { text: 'Real-Time', icon: 'fa-eye-slash' },
      { text: 'Audience', icon: 'fa-eye-slash' },
      { text: 'Conversions', icon: 'fa-eye-slash' },
    ],
  }),
};
</script>

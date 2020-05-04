<template>
  <div class="d-flex">
    <v-menu v-model="showMenu" offset-x>
      <template v-slot:activator="{ on }">
        <div class="workspace-logo" v-on="on">
          <v-avatar
            color="teal"
            :size="size"
            tile
            style="border-radius: 7px"
            class="fill-height"
          >
            <v-img v-if="workspace.logo" :src="workspace.logo" />
            <span v-else>
              {{ workspace.name }}
            </span>
          </v-avatar>
          <div class="ml-2 flex-column">
            <div class="font-weight-bold" style="font-size: 18px;">
              {{ workspace.name }}
              <v-btn icon x-small>
                <v-icon x-small>fa-chevron-down</v-icon>
              </v-btn>
            </div>
            <div style="font-size: .75em;">
              {{ user.username }}
            </div>
          </div>
        </div>
      </template>

      <v-list dense>
        <v-list-item class="pa-0" v-for="(item, index) in items" :key="index" dense>
          <v-btn text :to="{name: item.path}" class="text-capitalize w-full justify-start" :color="item.color || ''">
            <template v-slot:default>
              <v-icon small>{{ item.icon }}</v-icon>
              <span class="ml-2" style="font-size: .75em; font-weight: bold">{{ item.title }}</span>
            </template>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WorkspaceLogo",
  data() {
    return {
      showMenu: false,
      items: [
        { title: "Settings", path: "Settings", icon: "fa-cog" },
        { title: "Invite members", path: "SendInvitations", icon: "fa-user" },
        { title: "Logout", path: "Logout", icon: "fa-sign-out-alt", color: "red lighten-2" },
      ]
    };
  },
  props: {
    size: {
      type: [String, Number],
      required: false,
      default: 43
    }
  },
  computed: {
    ...mapGetters({ workspace: "currentWorkspace", user: "currentUser" })
  }
};
</script>

<style lang="scss" scoped>
.workspace-logo {
  cursor: pointer;
  display: flex;
}
</style>

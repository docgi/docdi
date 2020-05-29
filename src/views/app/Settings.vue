<template>
  <div>
    <div class="d-flex align-center">
      <v-icon x-large>
        {{ "fa-cog" }}
      </v-icon>

      <span class="ml-4 header" style="padding-top: 7px;">
        Settings
      </span>
    </div>

    <v-tabs v-model="tab">
      <v-tab v-for="(item, index) in items" :key="index" class="pl-0">
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in items" :key="index">
        <v-card flat>
          <v-card-text class="px-0">
            <user-setting v-if="item.key === 'USER'" />
            <workspace-setting v-if="item.key === 'WORKSPACE'" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import UserSetting from "@/components/app/tabs/UserProfile";
import WorkspaceSetting from "@/components/app/tabs/WorkspaceSetting";

export default {
  name: "Settings",
  metaInfo: {
    title: "Settings"
  },
  components: {
    UserSetting, WorkspaceSetting
  },
  data() {
    return {
      tab: null,
      items: [
        {
          title: "Workspace Setting",
          key: "WORKSPACE",
          hash: ""
        },
        {
          title: "User profile",
          key: "USER",
          hash: "user"
        }
      ]
    }
  },
  created() {
    let hash = this.$route.hash;
    for (const [index, item] of this.items.entries()) {
      if (`#${item.hash}` === hash) {
        this.tab = index;
        break
      }
    }
    this.tab = 0;
  },
  methods: {
    tabChange(index) {
      history.pushState(
        {},
        null,
        this.$route.path + `#${this.items[index].hash}`
      )
    }
  }
}
</script>

<template>
  <div>
    <v-tabs v-model="tab" color="basil">
      <v-tab v-for="(item, index) in items" :key="index">
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in items" :key="index">
        <v-card flat>
          <v-card-text>
            <user-setting v-if="item.key === 'USER'" />
            <workspace-setting v-if="item.key === 'WORKSPACE'" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import UserSetting from "@/components/app/settings/UserSetting";
import WorkspaceSetting from "@/components/app/settings/WorkspaceSetting";

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
          key: "WORKSPACE"
        },
        {
          title: "User profile",
          key: "USER"
        }
      ]
    }
  }
}
</script>

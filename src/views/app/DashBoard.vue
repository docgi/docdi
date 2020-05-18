<template>
  <div>
    <div class="d-flex align-center">
      <v-icon x-large>
        {{ "fa-home" }}
      </v-icon>

      <span class="ml-4 header" style="padding-top: 7px;">
        Dashboard
      </span>
    </div>
    <v-tabs v-model="tab">
      <v-tab
        v-for="(item, index) in tabItems"
        :key="index"
        class="justify-start pa-0 mr-4"
        style="min-width: fit-content"
      >
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item.key">
        <recently-update v-if="item.key === 'recently-update'" />
        <my-drafts v-if="item.key === 'my-drafts'" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import MyDrafts from "@/components/app/tabs/MyDrafts";
import RecentlyUpdate from "@/components/app/tabs/RecentlyUpdate";

export default {
  name: "Dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    MyDrafts,
    RecentlyUpdate
  },
  data() {
    return {
      tab: null,
      tabItems: [
        {
          title: "Recently update",
          key: "recently-update",
          hash: ""
        },
        {
          title: "My Drafts",
          key: "my-drafts",
          hash: "#mydrafts"
        },
      ],
    };
  }
};
</script>

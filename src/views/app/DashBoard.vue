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
    <v-tabs v-model="tab" color="basil">
      <v-tab v-for="item in items" :key="item">
        <span class="text-capitalize">{{ item }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  data() {
    return {
      tab: null,
      items: ["Recently Update", "Your Draft"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

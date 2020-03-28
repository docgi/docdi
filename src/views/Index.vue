<template>
  <div class="fill-height">
    <v-app-bar flat>
      <div class="d-flex mx-auto app-bar-inner">
        <v-btn text to="/" class="pa-2" height="40px">
          <img :src="icon" style="height: 30px" alt="icon" /><span>Docdi</span>
        </v-btn>
        <v-btn
          v-if="show"
          style="margin-left: auto"
          to="/create-workspace"
          class="text-capitalize"
          height="40px"
          color="success"
          outlined
        >
          New workspace
        </v-btn>
      </div>
    </v-app-bar>
    <div class="fill-height">
      <router-view />
    </div>
  </div>
</template>

<script>
import Icon from "@/assets/icon.svg";

export default {
  name: "index",
  data() {
    return {
      icon: Icon,
      show: true,
    };
  },
};
</script>

<style scoped>
.app-bar-inner {
  width: 100%;
}

@media (min-width: 1000px) {
  .app-bar-inner {
    width: 60%;
  }
}
</style>

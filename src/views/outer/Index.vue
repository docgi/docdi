<template>
  <div class="fill-height">
    <v-app-bar flat>
      <div class="d-flex mx-auto app-bar-inner">
        <v-btn text to="/" class="pa-2" height="40px">
          <img :src="icon" style="height: 30px" alt="icon" /><span>Docdi</span>
        </v-btn>
        <div style="margin-left: auto; justify-content: space-between" class="d-flex align-center">
          <v-btn
            to="/create-workspace"
            class="text-capitalize mr-2"
            color="primary"
            small
          >
            New workspace
          </v-btn>

          <v-btn
            to="/checking-workspace"
            class="text-capitalize"
            color="primary"
            outlined
            small
          >
            Login
          </v-btn>

        </div>
      </div>
    </v-app-bar>
    <div  >
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

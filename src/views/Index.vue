<template>
  <div>
    <v-app-bar flat>
      <div class="mx-auto app-bar-inner">
        <v-btn text to="/" class="pa-0">
          <img :src="icon" style="height: 35px" alt="icon" /><span>Docdi</span>
        </v-btn>
      </div>
    </v-app-bar>
    <div>
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
      icon: Icon
    };
  }
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

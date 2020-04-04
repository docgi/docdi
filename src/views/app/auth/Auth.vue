<template>
  <div class="fill-height">
    <v-app-bar flat app fixed>
      <div class="d-flex mx-auto app-bar-inner">
        <v-btn text :href="mainAppDomain" height="40px">
          <img :src="icon" style="height: 30px" alt="icon" /><span>Docdi</span>
        </v-btn>
      </div>
    </v-app-bar>

    <div class="w-full fill-height">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import { getMainAppDomain } from "@/common/utils";
import Icon from "@/assets/icon.svg";

export default {
  name: "Auth",
  data() {
    return {
      icon: Icon,
      mainAppDomain: getMainAppDomain()
    };
  }
};
</script>

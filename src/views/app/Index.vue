<template>
  <div class="d-flex fill-height">
    <the-nav-bar />
    <the-app-bar />
    <v-content>
      <v-container fluid class="d-flex justify-center">
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
import TheNavBar from "@/components/app/TheNavBar";
import TheAppBar from "@/components/app/TheAppBar";

export default {
  name: "AppIndex",
  components: {
    TheNavBar,
    TheAppBar
  }
};
</script>

<template>
  <div class="d-flex fill-height">
    <the-nav-bar />
    <the-app-bar />
    <v-content>
      <v-container fluid class="d-flex justify-center">
        <div class="d-flex justify-center">
          <div class="col-12 col-md-10 col-lg-6 pa-0">
            <router-view />
          </div>
        </div>
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

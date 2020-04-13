<template>
  <v-app-bar
    app
    floating
    color="white"
    absolute
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="setDrawer(true)"
    />
    <v-spacer></v-spacer>

    <v-btn icon class="mr-auto">
      <v-icon>fa-search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TheAppBar",
  methods: {
    ...mapMutations(["setDrawer"])
  }
}
</script>

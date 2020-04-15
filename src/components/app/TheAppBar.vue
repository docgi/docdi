<template>
  <v-app-bar
    app
    flat
    color="white"
    hide-on-scroll
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="setDrawer(true)"
    />
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

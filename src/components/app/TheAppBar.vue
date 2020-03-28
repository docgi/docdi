<template>
  <v-app-bar
    app
    floating
    color="#ffffff"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="setDrawer(true)"
    />
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

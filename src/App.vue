<template>
  <v-app app class="fill-height">
    <router-view />
    <notifications position="bottom right" group="foo" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

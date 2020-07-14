<template>
  <v-menu>
    <template v-slot:activator="{on}">
      <v-btn>{{  }}</v-btn>
    </template>
  </v-menu>
</template>

<script>
export default {
  name: "CusMenu",
  props: {
    menuItems: {
      required: true,
      type: Array
    }
  }
}
</script>

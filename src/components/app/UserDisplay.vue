<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-avatar v-on="on" :size="size">
          <img v-if="user.avatar" :src="user.avatar" :alt="user.username" />
          <span v-else class="white--text headline">{{ user.username }}</span>
        </v-avatar>
      </template>
      <span>{{ user.username }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "UserDisplay",
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    }
  }
}
</script>

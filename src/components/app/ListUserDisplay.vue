<template>
  <div class="d-inline-flex flex-row-reverse">
    <user-display
      v-for="(user, key) in users"
      :user="user"
      :size="size"
      :key="key"
      :style="overlay ? 'margin-left: -10px' : ''"
    />
  </div>
</template>

<script>
import UserDisplay from "@/components/app/UserDisplay";
export default {
  name: "ListUserDisplay",
  components: { UserDisplay },
  props: {
    users: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 28
    },
    overlay: {
      type: Boolean,
      default: true
    }
  }
};
</script>

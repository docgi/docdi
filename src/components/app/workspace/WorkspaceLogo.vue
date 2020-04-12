<template>
  <div class="d-flex w-logo">
    <v-avatar color="teal" :size="size" tile style="border-radius: 7px" class="fill-height">
      <v-img :src="workspace.logo" />
    </v-avatar>
    <div class="ml-2 flex-column">
      <div class="font-weight-bold" style="font-size: 18px;">
        {{ workspace.name }}
      </div>
      <div style="font-size: 13px;">
        {{ user.username }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WorkspaceLogo",
  props: {
    size: {
      type: [String, Number],
      required: false,
      default: 43
    }
  },
  computed: {
    ...mapGetters({ workspace: "currentWorkspace", user: "currentUser" })
  },
  methods: {
    cc() {
      window.alert(1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

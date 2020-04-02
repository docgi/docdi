<template>
  <div>
    <v-avatar color="teal" :size="size" tile style="border-radius: 7px">
      <span class="white--text headline">
        {{ shortWorkspaceName }}
      </span>
    </v-avatar>
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
      default: 62
    }
  },
  computed: {
    ...mapGetters({ workspace: "currentWorkspace" }),
    shortWorkspaceName() {
      if (this.workspace.name) {
        return this.workspace.name.substr(0, 3);
      }
      return "";
    }
  }
};
</script>

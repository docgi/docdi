<template>
  <div class="d-flex w-full fill-height justify-center" style="padding-top: 150px;">
    {{ workspaces }}
  </div>
</template>

<script>
import { listWorkspaces } from "../common/utils";

export default {
  name: "Login",
  data() {
    return {
      workspaces: []
    };
  },
  created() {
    this.workspaces = listWorkspaces();
  }
};
</script>

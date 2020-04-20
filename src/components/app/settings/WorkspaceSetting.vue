<template>
  <div>
    <div class="d-flex mt-6">
      <div class="d-flex flex-column">
        <div class="font-weight-bold">Workspace logo</div>
        <div class="avatar-wrapper">
          <v-avatar tile size="100" color="teal" style="border-radius: 7px" >
            <img v-if="workspace.logo" :src="workspace.logo">
            <span v-else>No logo</span>
          </v-avatar>
        </div>

        <div class="d-flex mt-6">
          <v-btn color="primary" small>Save</v-btn>
        </div>
      </div>
    </div>

    <v-divider class="mt-6" />
    <div class="d-flex mt-6">
      <v-btn text :to="{name: 'SendInvitations'}" color="primary">Send invitations</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WorkspaceSetting",
  computed: {
    ...mapGetters({workspace: "currentWorkspace"})
  }
}
</script>

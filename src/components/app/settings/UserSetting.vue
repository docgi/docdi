<template>
  <div>
    <div class="d-flex mt-6">
      <div class="d-flex flex-column">
        <div class="font-weight-bold">Avatar</div>
        <div class="avatar-wrapper">
          <v-avatar tile size="100" color="teal" style="border-radius: 7px" >
            <img v-if="user.avatar" :src="user.avatar">
            <span v-else>No avatar</span>
          </v-avatar>
        </div>

        <div class="mt-6">
          <div class="font-weight-bold">Username</div>

          <v-text-field
            outlined
            dense
            :value="user.username"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-btn color="primary" small>Save</v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserSetting",
  computed: {
    ...mapGetters({ user: "currentUser" })
  }
};
</script>

<style scoped lang="scss" >
.avatar-wrapper {

}
</style>

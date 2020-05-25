<template>
  <div class="d-flex mt-6">
    <div class="d-flex flex-column">
      <div class="font-weight-bold">Avatar</div>
      <v-hover v-slot:default="{ hover }">
        <v-avatar
          tile
          size="100"
          style="border-radius: 7px;"
          class="d-flex flex-column"
        >
          <v-img :src="getSrcAvatar">
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out align-center fill-height justify-center w-full"
              >
                <label for="file-upload" class="label">
                  Change
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="selectAvatar($event)"
                />
              </div>
            </v-expand-transition>
          </v-img>
        </v-avatar>
      </v-hover>

      <div class="mt-6">
        <div class="font-weight-bold">Username</div>

        <v-text-field
          :error-messages="error.username"
          outlined
          dense
          v-model="username"
          :placeholder="user.username"
        ></v-text-field>
      </div>
      <div class="d-flex">
        <v-btn
          class="text-capitalize"
          color="primary"
          small
          @click="update"
          :disabled="!avatar && !changeUsername"
        >
          Update
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_USER } from "@/store/actions.type";

export default {
  name: "UserSetting",
  data() {
    return {
      avatar: null,
      changeUsername: "",
      error: {}
    };
  },
  methods: {
    selectAvatar(event) {
      if (event.target.files.length > 0) {
        this.avatar = event.target.files[0];
      }
    },
    async update() {
      this.error = {};
      try {
        let payload = {
          username: this.changeUsername
        };
        if (this.avatar) {
          payload.avatar = this.avatar;
        }
        await this.$store.dispatch(UPDATE_USER, payload);
      } catch (e) {
        this.error = e.response.data;
      } finally {
        this.avatar = null;
        this.changeUsername = "";
      }
    }
  },
  computed: {
    username: {
      get() {
        return this.user.username;
      },
      set(value) {
        this.changeUsername = value;
      }
    },
    user() {
      return this.$store.getters.currentUser;
    },
    getSrcAvatar() {
      if (this.avatar) {
        return URL.createObjectURL(this.avatar);
      }
      return this.user.avatar;
    }
  }
};
</script>

<style lang="scss" scoped>
input[id="file-upload"] {
  display: none;
}
.label {
  display: inline-block;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  background-color: white;
  border-radius: 3px;
}
</style>

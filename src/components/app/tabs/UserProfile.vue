<template>
  <div class="d-flex mt-6 flex-column">
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

      <div class="col-12 col-md-4 px-0">
        <div class="font-weight-bold">Username</div>
        <v-text-field
          :error-messages="error.username"
          outlined
          dense
          v-model="username"
          :placeholder="user.username"
        />
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

    <v-divider class="my-7" />

    <div class="col-12 col-md-4 pa-0">
      <div class="font-weight-bold mb-4">Change Password</div>

      <v-text-field
        outlined
        label="Current Password"
        dense
        v-model="currentPass"
        type="password"
        :error-messages="error.old_pass"
      />

      <v-text-field
        outlined
        label="Password"
        dense
        type="password"
        v-model="password"
        :error-messages="errorsPass"
        :disabled="currentPass === ''"
      />

      <v-text-field
        outlined
        label="Confirm Password"
        dense
        v-model="confirmPass"
        type="password"
        :error-messages="errorsConfirmPass"
        :disabled="currentPass === ''"
      />

      <v-btn
        small
        class="text-capitalize"
        color="primary"
        :disabled="!isValidPassword"
        @click="changePass"
      >
        Set password
      </v-btn>
    </div>
  </div>
</template>

<script>
import { UPDATE_USER } from "@/store/actions.type";
const MIN_LEN_PASS = 8;

export default {
  name: "UserProfile",
  data() {
    return {
      avatar: null,
      changeUsername: "",
      error: {},
      currentPass: "",
      password: "",
      confirmPass: "",
      errorsPass: [],
      errorsConfirmPass: [],
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
    },
    changePass() {
      let payload = {
        old_pass: this.currentPass,
        new_pass: this.password,
        repeat_pass: this.confirmPass
      }
      this.$http.post("users/me/change-password/", payload)
        .then(() => {
          this.currentPass = "";
          this.password = "";
          this.confirmPass = "";
          this.error = {};
        })
        .catch(error => {
          this.error = error.response.data;
        })
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
      return this.user.avatar ? this.user.avatar : "";
    },
    isValidPassword() {
      if (this.password.length < MIN_LEN_PASS) {
        return false;
      }
      return this.password === this.confirmPass;
    }
  },
  watch: {
    confirmPass() {
      if (!this.password) {
        return;
      }
      if (this.confirmPass !== this.password) {
        this.errorsConfirmPass = ["Password doesn't match."];
        return;
      }
      this.errorsConfirmPass = [];
    },
    password() {
      if (this.password.length < MIN_LEN_PASS) {
        this.errorsPass = ["Password as least 8 character."];
        return;
      }

      // Validate against with confirm pass
      if (this.confirmPass) {
        if (this.password === this.confirmPass) {
          this.errorsPass = [];
          this.errorsConfirmPass = [];
          return;
        } else {
          this.errorsConfirmPass = ["Password doesn't match."];
        }
      }

      this.errorsPass = [];
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

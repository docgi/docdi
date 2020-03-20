<template>
  <div
    class="d-flex w-full fill-height justify-center flex-column align-center"
  >
    <v-alert
      v-if="!hasToken"
      border="left"
      colored-border
      type="warning"
      elevation="2"
      min-width="450px"
    >
      You need create
      <router-link to="/create-workspace">create workspace</router-link> first.
    </v-alert>
    <v-form @submit.prevent="setPass" class="create-workspace-form">
      <div class="create-workspace-input-form-title">
        Set your password.
      </div>
      <div class="create-workspace-form-content">
        <div class="create-workspace-input-form-subtitle">
          Yah, strong password is good?
        </div>
        <div class="mt-1">
          <v-text-field
            v-model="password"
            label="Password"
            text
            outlined
            dense
            class="input-workspace-name d-flex-inline"
            @change="onChangePass"
            :error-messages="errorsPass"
            :disabled="!hasToken"
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'fa-eye-slash' : 'fa-eye'"
            @click:append="showPass = !showPass"
          />
          <v-text-field
            label="Repeat password"
            v-model="confirmPass"
            outlined
            text
            dense
            class="input-workspace-name d-flex-inline"
            @change="onChangeConfirmPass"
            :disabled="!hasToken"
            :error-messages="errorsConfirmPass"
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'fa-eye-slash' : 'fa-eye'"
            @click:append="showPass = !showPass"
          />
          <div class="d-flex justify-center">
            <v-btn
              :loading="submitting"
              small
              color="primary"
              type="submit"
              :disabled="!hasToken || !isValidPassword || submitting"
            >
              Submit
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { getToken, removeToken } from "../../common/token.service";
const MIN_LEN_PASS = 2;

export default {
  name: "SetPassWord",
  data() {
    return {
      token: "",
      password: "",
      showPass: false,
      confirmPass: "",
      hasToken: false,
      errorsPass: [],
      errorsConfirmPass: [],
      submitting: false,
      showSetToken: false
    };
  },
  created() {
    this.token = getToken();
    if (this.token) {
      this.hasToken = true;
      removeToken();
    }
  },
  methods: {
    async setPass() {
      this.submitting = true;
      let payload = {
        password: this.password,
        confirm_password: this.confirmPass
      };
      try {
        await this.$http.post("users/set-password/", payload, {
          headers: { Authorization: "Bearer " + this.token }
        });
        this.submitting = false;
      } catch (e) {
        let response = { ...e.response };
        if (response.data.password) {
          this.errorsPass = response.data.password;
        }
        if (response.data.confirm_password) {
          this.errorsPass = response.data.confirm_password;
        }
        this.submitting = false;
      }
    },
    onChangePass() {
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
    },
    onChangeConfirmPass() {
      if (!this.password) {
        return;
      }
      if (this.confirmPass !== this.password) {
        this.errorsConfirmPass = ["Password doesn't match."];
        return;
      }
      this.errorsConfirmPass = [];
    }
  },
  computed: {
    isValidPassword() {
      if (this.password.length < MIN_LEN_PASS) {
        return false;
      }
      return this.password === this.confirmPass;
    }
  }
};
</script>

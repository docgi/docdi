<template>
  <v-form @submit.prevent="setPass" class="create-workspace-form">
    <div class="create-workspace-input-form-title">
      Set your password.
    </div>
    <div class="create-workspace-form-content">
      <div class="create-workspace-input-form-subtitle mb-4">
        Yah, strong password is good for you?
      </div>
      <div>
        <v-text-field
          v-model="password"
          label="Password"
          text
          outlined
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
          class="input-workspace-name d-flex-inline"
          @change="onChangeConfirmPass"
          :disabled="!hasToken"
          :error-messages="errorsConfirmPass"
          :type="showConfirmPass ? 'text' : 'password'"
          :append-icon="showConfirmPass ? 'fa-eye-slash' : 'fa-eye'"
          @click:append="showConfirmPass = !showConfirmPass"
        />
        <div class="justify-center">
          <v-btn
            :loading="submitting"
            class="w-full"
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
</template>

<script>
import { getToken, removeToken } from "@/common/token.service";

const MIN_LEN_PASS = 8;

export default {
  name: "SetPassWord",
  data() {
    return {
      token: "",
      password: "",
      showPass: false,
      confirmPass: "",
      showConfirmPass: false,
      hasToken: false,
      errorsPass: [],
      errorsConfirmPass: [],
      submitting: false
    };
  },
  created() {
    this.token = getToken();
    if (this.token) {
      this.hasToken = true;
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
        let response = await this.$http.post("users/set-password/", payload, {
          headers: { Authorization: "Bearer " + this.token },
          errorHandle: false
        });
        this.submitting = false;
        removeToken();

        let workspaceName = response.data.workspace_name;
        location.href = `${location.protocol}//${workspaceName}.${location.host}`;
      } catch (e) {
        if (e.response.data.password) {
          this.errorsPass = e.response.data.password;
        }
        if (e.response.data.confirm_password) {
          this.errorsPass = e.response.data.confirm_password;
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

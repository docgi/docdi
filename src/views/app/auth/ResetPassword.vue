<template>
  <div class="fill-height">
    <div class="pt-12 d-flex justify-center">
      <v-form @submit.prevent="setPass" class="create-workspace-form mt-12">
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
    </div>
  </div>
</template>

<script>
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
    this.token = this.$route.query.token;
    if (this.token) {
      this.hasToken = true;
    }
  },
  methods: {
    async setPass() {
      this.submitting = true;
      let payload = {
        password: this.password,
        confirm_password: this.confirmPass,
        token: this.token
      };
      try {
        let response = await this.$http.post("auth/reset-password/", payload);
        this.submitting = false;
        if (response.data.status === true) {
          location.href = `${location.origin}/auth/login`
        }
      } catch (e) {
        if (e.response.data.password) {
          this.errorsPass = e.response.data.password;
        }
        if (e.response.data.confirm_password) {
          this.errorsPass = e.response.data.confirm_password;
        }
        if (e.response.msg) {
          this.$notify({
            group: "noti",
            type: "error",
            title: e.response.msg
          })
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

<template>
  <div class="fill-height" v-show="show">
    <v-form
      v-if="!showForgotPassword"
      @submit.prevent="login"
      class="create-workspace-form mt-12"
    >
      <div class="create-workspace-input-form-title">
        Sign in to <b>{{ workspaceName }}</b>
      </div>
      <div class="create-workspace-form-content">
        <div>
          <div class="create-workspace-input-form-subtitle mb-4">
            Enter your email and password
          </div>
          <v-text-field
            v-model="email"
            label="Email"
            text
            outlined
            autofocus
            :error-messages="errors"
          />
          <v-text-field
            label="Password"
            v-model="password"
            outlined
            text
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'fa-eye-slash' : 'fa-eye'"
            @click:append="showPass = !showPass"
          />
          <div class="justify-center">
            <v-btn
              :loading="submitting"
              class="w-full"
              color="primary"
              type="submit"
              :disabled="!validPayload"
            >
              Submit
            </v-btn>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <v-btn
          @click="switchMode"
          class="pl-0"
          text
          small
          color="primary"
        >
          Forgot password?
        </v-btn>
      </div>
    </v-form>

    <!--  Case forgot password  -->
    <v-form
      v-else
      class="create-workspace-form mt-12"
      @submit.prevent="forgotPasswordSubmit"
    >
      <div class="create-workspace-input-form-title">
        Reset password
      </div>
      <div class="create-workspace-form-content">
        <div>
          <div v-if="!showForgotSuccess">
            <div class="create-workspace-input-form-subtitle mb-4">
              Enter your email.
            </div>
            <v-text-field
              v-model="email"
              label="Email"
              text
              outlined
              autofocus
              :error-messages="errors"
            />
            <div class="justify-center">
              <v-btn
                :loading="submitting"
                class="w-full"
                color="primary"
                type="submit"
                :disabled="!validPayloadReset"
              >
                Submit
              </v-btn>
            </div>
          </div>
          <div v-else class="text-danger">
            <span class="text-danger">Email reset password has been sent, please check inbox, link reset
              expires in one day.</span>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <v-btn
          @click="switchMode"
          class="pl-0"
          text
          small
          color="primary"
        >
          Back to login
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { workspaceNameFromHost } from "@/common/utils";
import { setToken, getToken } from "@/common/token.service";

export default {
  name: "Login",
  data() {
    return {
      show: false,
      email: "",
      password: "",
      workspaceName: "",
      submitting: false,
      showPass: false,
      errors: [],
      showForgotPassword: false,
      showForgotSuccess: false
    };
  },
  created() {
    let hasToken = !!getToken();
    if (hasToken) {
      this.$router.push({name: "Dashboard"});
    } else {
      this.show = true;
    }
    this.workspaceName = workspaceNameFromHost();
  },
  methods: {
    async login() {
      try {
        this.errors = [];
        let payload = {
          email: this.email,
          password: this.password,
          workspace: this.workspaceName
        };
        let response = await this.$http.post("auth/login/", payload);
        let token = response.data.token;
        setToken(token);
        await this.$router.push({name: "Dashboard"});
      } catch (e) {
        this.errors = ["Incorrect email or password."];
      }
    },
    async forgotPasswordSubmit() {
      try {
        let payload = {
          email: this.email,
          workspace: this.workspaceName,
          client_origin: location.origin
        };
        let response = await this.$http.post("auth/forgot-password/", payload);
        if (!response.data.send && response.data.send !== 1) {
          this.errors = ["Something wrong please try again"];
        } else {
          this.showForgotSuccess = true;
        }
      } catch (e) {
        if (e.response.data.email) {
          this.errors = e.response.data.email;
        } else {
          this.errors = ["Something wrong please try again"];
        }
      }
    },
    switchMode() {
      this.showForgotPassword = !this.showForgotPassword;
      this.password = "";
      this.submitting = false;
      this.errors = [];
    }
  },
  computed: {
    validPayload() {
      return !(!this.email || !this.password);
    },
    validPayloadReset() {
      return !!this.email;
    }
  }
};
</script>

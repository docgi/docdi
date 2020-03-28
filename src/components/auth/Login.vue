<template>
  <v-form @submit.prevent="login" class="create-workspace-form">
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
  </v-form>
</template>

<script>
import { workspaceNameFromHost } from "../../common/utils";
import { setToken } from "../../common/token.service";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      workspaceName: "",
      submitting: false,
      showPass: false,
      errors: []
    };
  },
  created() {
    this.workspaceName = workspaceNameFromHost();
  },
  methods: {
    async login() {
      try {
        let payload = {
          email: this.email,
          password: this.password,
          workspace: this.workspaceName,
        };
        let response = await this.$http.post('auth/login/', payload);
        let token = response.data.token;
        setToken(token);
        await this.$router.push('/');
      } catch (e) {
        this.errors = ["Incorrect email or password."]
      }
    }
  },
  computed: {
    validPayload() {
      return !(!this.email || !this.password);
    }
  }
};
</script>

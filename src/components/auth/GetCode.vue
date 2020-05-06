<template>
  <v-form
    @submit.prevent="getCode"
    :disabled="submitting"
    class="create-workspace-form"
  >
    <div class="create-workspace-input-form-title">
      Create new workspace to docdi!
    </div>
    <div class="create-workspace-form-content">
      <div class="create-workspace-input-form-subtitle mb-4">
        First, enter your work email.
      </div>
      <v-text-field
        :error-messages="errorServerMsg"
        v-model="email"
        label="Email"
        type="email"
        outlined
        placeholder="your@email.com"
        autofocus
      />
    </div>
    <div class="d-flex">
      <v-btn
        :loading="submitting"
        :disabled="!validEmail"
        color="primary"
        type="submit"
        class="w-full"
      >
        Get code
      </v-btn>
    </div>
    <div class="mt-6">
      <div class="d-inline">
        If you already have an workspace
      </div>
      <div class="d-inline">
        <router-link to="/checking-workspace">
          login
        </router-link>
      </div>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "GetCode",
  data() {
    return {
      email: "",
      submitting: false,
      errorServerMsg: []
    };
  },
  computed: {
    validEmail() {
      return this.email !== "";
    }
  },
  methods: {
    async getCode() {
      this.errorServerMsg = [];
      this.submitting = true;
      try {
        await this.$http.post("/create-workspace/get-code/", {
          email: this.email
        }, );
        this.submitting = false;
        this.$emit("nextStep", { email: this.email });
      } catch (e) {
        this.submitting = false;
        if (e.response.status === 400) {
          this.errorServerMsg = e.response.data.email;
        } else {
          this.errorServerMsg = ["Something wrong, please try again."]
        }
      }
    }
  }
};
</script>

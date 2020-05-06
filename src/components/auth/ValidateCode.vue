<template>
  <v-form @submit.prevent="validateCode" class="create-workspace-form">
    <div class="create-workspace-input-form-title">
      Check your email.
    </div>
    <div class="create-workspace-form-content">
      <div class="create-workspace-input-form-subtitle">
        We've sent a 6-digit confirmation code to
        <span style="font-weight: bold">
          {{ email }}
        </span>
        . It will expire shortly, so enter it soon.
      </div>
      <div class="mt-1">
        <v-text-field
          v-model.trim="code"
          :error-messages="errorServerMsg"
          class="input-security-code"
          solo
          placeholder="903876"
          maxLength="6"
        />
        <div class="d-flex justify-center">
          <v-btn :disabled="!isValidInput" type="submit" color="primary" class="w-full">
            Next
          </v-btn>
        </div>
      </div>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "ValidateCode",
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      code: "",
      submitting: false,
      errorServerMsg: []
    };
  },
  computed: {
    isValidInput() {
      return this.code.length === 6;
    }
  },
  methods: {
    async validateCode() {
      this.errorServerMsg = [];
      this.submitting = true;
      try {
        const payload = {
          email: this.email,
          code: this.code
        };
        await this.$http.post("/create-workspace/check-code/", payload, );
        this.submitting = false;
        this.$emit("nextStep", {
          code: this.code
        });
      } catch (e) {
        this.submitting = false;
        this.errorServerMsg = e.response.data.code;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.input-security-code {
  &::v-deep input {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 10px;
  }
}
</style>

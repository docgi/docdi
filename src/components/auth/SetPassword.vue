<template>
  <form @submit.prevent="submit" class="create-workspace-form">
    <div class="create-workspace-input-form-title">
      Set your password.
    </div>
    <div class="create-workspace-form-content">
      <div class="create-workspace-input-form-subtitle">
        This is the first time you create account. Please fill out your password
      </div>
      <div class="mt-1">
        <v-text-field
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          dense
          outlined
        />
        <v-text-field
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordConfirm ? 'text' : 'password'"
          label="Password confirm"
          dense
          outlined
        />
      </div>
      <div class="d-flex justify-center">
        <v-btn small color="primary" type="submit">Submit</v-btn>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SetPassword',
  props: {
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      showPassword: false,
      showPasswordConfirm: false,
      submitting: false,
      errorServerMsg: []
    }
  },
  methods: {
    async submit() {
      try {
        this.submitting = true
        this.errorServerMsg = []
        const payload = {
          password: this.password,
          password_confirm: this.passwordConfirm
        }
        await this.$http.post('/users/set-password/', payload, {
          headers: {
            Authorization: `Bear ${this.token}`
          }
        })
      } catch (e) {
        this.errorServerMsg = e.response.data.password_confirm
      }
    }
  }
}
</script>

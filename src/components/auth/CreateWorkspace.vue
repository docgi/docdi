<template>
  <v-form @submit.prevent="createWorkspace" class="create-workspace-form">
    <div class="create-workspace-input-form-title">
      Naming your workspace
    </div>
    <div class="create-workspace-form-content">
      <div class="create-workspace-input-form-subtitle">
        What is your workspace name?
      </div>
      <div class="mt-1">
        <v-text-field
          v-model.trim="workspaceName"
          :error-messages="errorServerMsg"
          solo
          text
          dense
          class="input-workspace-name d-flex-inline"
          placeholder="work-space-name"
        >
          <template v-slot:append-outer>
            <span class="host-name" style="color: black">
              {{ hostname }}
            </span>
          </template>
        </v-text-field>
        <div class="d-flex justify-center">
          <v-btn :loading="submitting" small color="primary" type="submit">
            Go
          </v-btn>
        </div>
      </div>
    </div>
  </v-form>
</template>

<script>

export default {
  name: "NamingWorkspace",
  props: {
    code: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      workspaceName: "",
      errorServerMsg: "",
      hostname: "",
      submitting: false
    };
  },
  mounted() {
    this.hostname = `.${process.env.VUE_APP_DOMAIN}`;
  },
  methods: {
    async createWorkspace() {
      try {
        this.submitting = true;
        this.errorServerMsg = [];
        const payload = {
          email: this.email,
          code: this.code,
          workspace_name: this.workspaceName
        };
        const result = await this.$http.post(
          "/create-workspace/create/",
          payload
        );
        this.submitting = false;
        const user = result.data.user;
        const token = result.data.token;
        const workspace = result.data.workspace;
        this.$emit("nextStep", { user, token, workspace });
      } catch (e) {
        if (e.response.data.workspace_name) {
          this.errorServerMsg = e.response.data.workspace_name;
        }
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.host-name {
  padding-top: 3px;
  font-size: larger;
  color: black;
}
.input-workspace-name {
  &::v-deep input {
    text-align: right;
  }
}
</style>

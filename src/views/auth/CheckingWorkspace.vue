<template>
  <div
    class="d-flex w-full justify-center mt-12"
  >
    <v-form @submit.prevent="checking" class="create-workspace-form">
      <div class="create-workspace-input-form-title">
        What is your workspace name?
      </div>
      <div class="create-workspace-form-content">
        <div class="mt-1">
          <v-text-field
            v-model.trim="workspaceName"
            :error-messages="errors"
            solo
            text
            dense
            class="input-workspace-name d-flex-inline"
            placeholder="work-space-name"
          >
            <template v-slot:append-outer>
              <span class="host-name" style="color: black">
                .{{ hostname }}
              </span>
            </template>
          </v-text-field>
          <div class="d-flex">
            <v-btn
              :loading="submitting"
              :disabled="!workspaceName"
              class="w-full"
              color="primary"
              type="submit"
            >
              Check
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { buildFullSubDomain, listWorkspaces } from "../../common/utils";

export default {
  name: "CheckingWorkspace",
  data() {
    return {
      workspaces: [],
      hostname: "",
      workspaceName: "",
      errors: [],
      submitting: false
    };
  },
  created() {
    this.workspaces = listWorkspaces();
    this.hostname = process.env.VUE_APP_DOMAIN;
  },
  methods: {
    async checking() {
      try {
        let response = await this.$http.post("workspaces/check/", {
          name: this.workspaceName
        });
        if (response.data.exist) {
          location.href = `${buildFullSubDomain(this.workspaceName)}/login`;
        }
        this.errors = ["This workspace does not exist"]
      } catch (e) {
        console.log(e);
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

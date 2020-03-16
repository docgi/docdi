<template>
  <div class="d-flex w-full fill-height justify-center align-center">
    <get-code
      v-if="currentStep === steps.getCode"
      @nextStep="mailDone($event)"
    />
    <validate-code
      v-if="currentStep === steps.validateCode"
      :email="email"
      @nextStep="codeDone"
    />
    <create-workspace
      v-if="currentStep === steps.namingWorkspace"
      :email="email"
      :code="code"
      @nextStep="createDone"
    />
    <set-token
      v-if="currentStep === steps.done"
      :token="token"
      :workspaceName="workspace.name"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  GetCode,
  ValidateCode,
  CreateWorkspace,
  SetToken
} from "../components/auth";

const STEPS = {
  getCode: 1,
  validateCode: 2,
  namingWorkspace: 3,
  done: 4
};

export default {
  components: { GetCode, ValidateCode, CreateWorkspace, SetToken },
  head() {
    return {
      title: "Docgi - Create workspace"
    };
  },
  data() {
    return {
      email: "",
      code: "",
      workspace: {},
      user: {},
      token: "",
      currentStep: STEPS.getCode,
      steps: STEPS
    };
  },
  methods: {
    ...mapMutations(["setUser", "setWorkspace"]),
    mailDone(event) {
      this.email = event.email;
      this.currentStep = this.steps.validateCode;
    },
    codeDone(event) {
      this.code = event.code;
      this.currentStep = this.steps.namingWorkspace;
    },
    createDone({ token, workspace }) {
      this.currentStep = this.steps.done;
      this.token = token;
      this.workspace = workspace;
    }
  }
};
</script>

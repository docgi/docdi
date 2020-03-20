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
      v-if="showSetToken"
      :token="token"
      :workspace-name="workspace.name"
      @nextStep="setTokenDone"
    />
  </div>
</template>

<script>
import { setToken } from "../../common/token.service";
import { rememberWorkspace } from "../../common/utils";
import {
  GetCode,
  ValidateCode,
  CreateWorkspace,
  SetToken
} from "../../components/auth";

const STEPS = {
  getCode: 1,
  validateCode: 2,
  namingWorkspace: 3,
  done: 4
};

export default {
  name: "CreateWorkspaceView",
  components: { SetToken, GetCode, ValidateCode, CreateWorkspace },
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
      showSetToken: false,
      steps: STEPS,
      isSetTokenDone: false
    };
  },
  methods: {
    mailDone(event) {
      this.email = event.email;
      this.currentStep = STEPS.validateCode;
    },
    codeDone(event) {
      this.code = event.code;
      this.currentStep = STEPS.namingWorkspace;
    },
    createDone({ token, workspace, user }) {
      this.currentStep = STEPS.done;
      this.token = token;
      this.workspace = workspace;
      this.user = { ...user };
      setToken(this.token);
      rememberWorkspace({ name: workspace.name, logo: workspace.logo });
      this.showSetToken = true;
    },
    setTokenDone({ status }) {
      console.log(status);
      if (this.user.need_pass) {
        this.$router.push({ name: "SetPassword" });
      } else {
        location.href = `${location.protocol}//${this.workspace.name}.${location.host}`;
      }
    }
  }
};
</script>

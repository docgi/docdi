<template>
  <div class="pa-12" style="height: 90%">
    <div class="d-flex justify-center align-center">
      <div>
        <get-code
          v-if="currentStep === steps.getCode"
          @nextStep="mailDone"
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
    </div>
  </div>
</template>

<script>
import { setToken } from "../../common/token.service";
// import SVGGetCode from "@/assets/svg/getcode.svg";
// import SVGVerifyCode from "@/assets/svg/verify-code.svg";
// import SVGNamingWorkspace from "@/assets/svg/naming-workspace.svg";
import {
  CreateWorkspace,
  GetCode,
  SetToken,
  ValidateCode
} from "../../components/auth";
import { rememberWorkspace } from "../../common/utils";

const STEPS = {
  getCode: 1,
  validateCode: 2,
  namingWorkspace: 3,
  done: 4
};

export default {
  name: "CreateWorkspaceView",
  components: { SetToken, GetCode, ValidateCode, CreateWorkspace },
  metaInfo: {
    title: "Docdi - Create workspace",
    titleTemplate: "%s"
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
      steps: STEPS
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
    setTokenDone() {
      if (this.user.need_pass) {
        this.$router.push({ name: "SetPassword" });
      } else {
        location.href = `${location.protocol}//${this.workspace.name}.${location.host}`;
      }
    }
  }
};
</script>

<template>
  <div>
    <iframe
      v-show="true"
      :src="iframeSrc"
      scrolling="no"
      frameborder="0"
      id="ifr"
      @load="sendToken"
    />
  </div>
</template>

<script>
import { isSubDomain } from "../../common/utils";

export default {
  name: "SetToken",
  props: {
    token: {
      type: String,
      required: true
    },
    workspaceName: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      iframeSrc: ""
    };
  },
  mounted() {
    let subDomain = `${location.protocol}//${this.workspaceName}.${location.host}`;
    this.iframeSrc = `${subDomain}/set-token`;
    window.currentComponent = this;
    window.onmessage = function(event) {
      if (isSubDomain(event.origin)) {
        let parsed;
        try {
          parsed = JSON.parse(event.data);
        } catch (error) {
          console.log(error.toString());
        }
        console.log(parsed);
        window.currentComponent.$emit("nextStep", {status: parsed.ok});
      }
    };
  },
  methods: {
    sendToken() {
      let ifr = window.document.getElementById("ifr").contentWindow;
      let message = {
        token: this.token
      };
      let payload = JSON.stringify(message);
      ifr.postMessage(payload, "*");
    },
  }
};
</script>

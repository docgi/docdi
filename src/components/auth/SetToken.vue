<template>
  <div>
    <iframe
      v-show="true"
      scrolling="no"
      :src="iframeSrc"
      frameborder="0"
      id="ifr"
      @load="sendToken"
    />
  </div>
</template>

<script>
import {isSubDomain} from "../../common/utils";

export default {
  name: "SetToken",
  props: {
    token: {
      type: String,
      required: true,
      default: "12344321"
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
    window.onmessage = function(event) {
      if (isSubDomain(event.origin)) {
        let parsed;
        try {
          parsed = JSON.parse(event.data);
        } catch (e) {
          console.log(e.toString());
        }
        if ("ok" in parsed) {
          window.location.href = subDomain;
        }
        // On some browser can't access `localStorage`, we need force user to login in this step
        window.location.href = `${subDomain}/login?firstTime=true`;
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
    }
  }
};
</script>

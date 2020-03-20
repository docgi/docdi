<template>
  <div class="justify-center d-flex align-center w-full" style="height: 100%;">
    <spin :loading="true" />
  </div>
</template>

<script>
import { setToken } from "../../common/token.service";
import { isParentOrigin } from "../../common/utils";
import Spin from "vue-spinner/src/PulseLoader";

export default {
  name: "IframeSetToken",
  components: {
    Spin
  },
  data() {
    return {
      tokenSet: false
    };
  },
  mounted() {
    window.onmessage = function(event) {
      if (isParentOrigin(event.origin)) {
        let parsed;
        let mesToParent = {
          ok: false
        };
        try {
          parsed = JSON.parse(event.data);
        } catch (e) {
          console.log(e.toString());
        }
        if (parsed.token) {
          this.tokenSet = true;
          try {
            setToken(parsed.token);
          } catch (e) {
            // Maybe `Brave` browser not allow set localStorage via iframe
            parent.postMessage(JSON.stringify(mesToParent), "*");
          }
          mesToParent.ok = true;
          parent.postMessage(JSON.stringify(mesToParent), "*");
        } else {
          parent.postMessage(JSON.stringify(mesToParent), "*");
        }
      }
    };
  }
};
</script>

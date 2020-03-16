<template>
  <div class="justify-center d-flex align-center w-full" style="height: 100%;">
    <spin v-if="!tokenSet" :loading="true" />
    <h5 v-else>setroine</h5>
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
    }
  },
  mounted() {
    window.onmessage = function(event) {
      if (!this.tokenSet) {
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
              parent.postMessage(JSON.stringify(mesToParent), "*");
            }
            mesToParent.ok = true;
            parent.postMessage(JSON.stringify(mesToParent), "*");
          } else {
            parent.postMessage(JSON.stringify(mesToParent), "*");
          }
        }
      }
    };
  }
};
</script>

<template>
  <div>
    <div
      class="d-flex w-full fill-height justify-center"
      style="padding-top: 150px;"
    >
      <set-password />
    </div>
  </div>
</template>

<script>
import Icon from "../../assets/icon.svg";
import { SetPassword } from "../../components/auth";


export default {
  name: "SetPasswordView",
  components: { SetPassword },
  data() {
    return {
      icon: Icon,
    }
  }
};
</script>

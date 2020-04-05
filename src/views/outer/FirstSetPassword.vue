<template>
  <div>
    <div
      class="d-flex w-full fill-height justify-center mt-12"
    >
      <set-password />
    </div>
  </div>
</template>

<script>
import Icon from "../../assets/icon.svg";
import { SetPassword } from "../../components/auth";


export default {
  name: "FirstSetPassword",
  metaInfo: {
    title: "Set you password",
    titleTemplate: null
  },
  components: { SetPassword },
  data() {
    return {
      icon: Icon,
    }
  }
};
</script>

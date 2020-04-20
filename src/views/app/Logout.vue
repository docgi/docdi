<template>
  <div>

  </div>
</template>

<script>
import { removeToken } from "@/common/token.service";

export default {
  name: "Logout",
  created() {
    removeToken();
    this.$router.push({name: "Login"})
  }
}
</script>

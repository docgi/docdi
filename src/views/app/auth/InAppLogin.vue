<template>
  <div class="d-flex w-full justify-center pt-12 fill-height">
    <login />
  </div>
</template>

<script>
import { Login } from "@/components/auth";

export default {
  name: "InAppLogin",
  components: {
    Login
  }
}
</script>

<template>
  <div class="d-flex w-full justify-center mt-12">
    <login />
  </div>
</template>

<script>
import {Login} from "../../components/auth";

export default {
  name: "InAppLogin",
  components: {
    Login
  }
}
</script>

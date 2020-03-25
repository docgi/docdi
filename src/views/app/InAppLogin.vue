<template>
  <div class="d-flex w-full fill-height justify-center"
       style="padding-top: 150px;">
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

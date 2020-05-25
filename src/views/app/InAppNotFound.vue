<template>
  <div class="d-flex flex-column my-auto justify-center align-center">
    <img :src="notFound" style="min-width: 290px; max-width: 500px" class="mx-4">
    <div class="mt-4">
      Page not found
    </div>
    <div>
      <v-btn class="mt-2" small color="primary" :to="{name: 'Dashboard'}">Back to Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
import NotFound from "@/assets/svg/not-found.svg";
export default {
  name: "InAppNotFound",
  data() {
    return {
      notFound: NotFound
    }
  }
};
</script>

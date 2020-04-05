<template>
  <div class="d-flex flex-column justify-center align-center mt-12 pt-12">
    <img :src="notFound" style="min-width: 290px; max-width: 500px" class="mx-4">
    <div class="mt-4">
      Page not found
    </div>
    <v-btn class="mt-2" small color="primary" @click="back">Back</v-btn>
  </div>
</template>

<script>
import NotFound from "@/assets/svg/not-found.svg";

export default {
  name: "OuterNotFound",
  metaInfo: {
    "title": "Page not found",
    "titleTemplate": null
  },
  data() {
    return {
      notFound: NotFound
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

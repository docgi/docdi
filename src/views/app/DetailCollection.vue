<template>
  <div>
    cols
    {{ id }}
  </div>
</template>

<script>
export default {
  name: "DetailCollection",
  data() {
    return {
      id: null,
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

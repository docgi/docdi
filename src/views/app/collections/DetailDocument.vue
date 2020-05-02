<template>
  <div>
    Dcos
    {{ id }}
  </div>
</template>

<script>
export default {
  name: "DetailDocument",
  data() {
    return {
      id: null,
    }
  },
  created() {
    this.id = this.$route.params.id;
  }
}
</script>

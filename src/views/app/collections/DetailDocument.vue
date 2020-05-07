<template>
  <div v-if="document">
    <docgi-editor :content="document.html_content" :editable="false" :key="document.id"/>
  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";
export default {
  name: "DetailDocument",
  components: { DocgiEditor },
  data() {
    return {
      document: null
    }
  },
  async created() {
    try {
      let response = await this.$http.get(`documents/${this.$route.params.id}/`);
      this.document = response.data;
    } catch (e) {
      console.log(e); // Todo
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      let response = await this.$http.get(`documents/${to.params.id}/`);
      this.document = response.data;
    } catch (e) {
      console.log(e); // Todo
    }
    next();
  }
}
</script>

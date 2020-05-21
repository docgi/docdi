<template>
  <div class="d-flex justify-center">
    <list-document-item v-if="docs.length > 0" :documents="docs" />
    <div v-if="docs.length === 0">
      Nothing happened
    </div>
  </div>
</template>

<script>
import ListDocumentItem from "@/components/app/ListDocumentItem";

export default {
  name: "ListDrafts",
  metaInfo: {
    title: "Recently update"
  },
  components: {
    ListDocumentItem
  },
  data() {
    return {
      docs: []
    }
  },
  created() {
    this.$http.get('recently-update-docs/')
      .then((response) => {
        this.docs = response.data;
      })
  }
}
</script>

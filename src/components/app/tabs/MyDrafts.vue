<template>
  <div class="d-flex justify-center">
    <list-document-item v-if="drafts.length > 0" :documents="drafts" />
    <div v-if="drafts.length === 0">
      Nothing happened
    </div>
  </div>
</template>

<script>
import ListDocumentItem from "@/components/app/ListDocumentItem";

export default {
  name: "ListDrafts",
  metaInfo: {
    title: "Drafts"
  },
  components: {
    ListDocumentItem
  },
  data() {
    return {
      drafts: []
    }
  },
  created() {
    this.$http.get('documents/?draft=true&own=true')
      .then((response) => {
        this.drafts = response.data;
      })
  }
}
</script>

<template>
  <div class="d-flex justify-center align-center">
    <list-document-item v-if="drafts.length > 0" :documents="drafts" />
    <v-card v-if="drafts.length === 0" min-height="500" class="align-center d-flex" flat>
      <v-card-text>
        <div>
          You have no draft documents
        </div>
      </v-card-text>
    </v-card>
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

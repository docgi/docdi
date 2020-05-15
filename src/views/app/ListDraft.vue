<template>
  <div>
    <div class="d-flex align-center">
      <v-icon x-large>
        {{ "fa-pencil-alt" }}
      </v-icon>

      <span class="ml-4 header" style="padding-top: 7px;">
        My drafts
      </span>
    </div>

    <v-divider class="mt-2" />

    <list-document-item v-if="drafts" :documents="drafts" />

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

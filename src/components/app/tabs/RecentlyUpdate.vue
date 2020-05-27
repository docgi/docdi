<template>
  <div class="d-flex justify-center align-center">
    <list-document-item v-if="docs.length > 0" :documents="docs" />
    <v-card v-if="docs.length === 0" flat min-height="500" class="align-center d-flex">
      <v-card-text>
        Nothing happened
        <v-btn
          color="primary"
          small
          class="text-capitalize"
          @click="$store.commit('setDialog', { newDocument: true })">
          Create document
        </v-btn>
      </v-card-text>
    </v-card>
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
    };
  },
  created() {
    this.$http.get("recently-update-docs/").then(response => {
      this.docs = response.data;
    });
  }
};
</script>

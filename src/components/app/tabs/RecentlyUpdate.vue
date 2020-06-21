<template>
  <div>
    <div v-if="loading" class="d-flex mt-4">
      <content-placeholders class="w-full" :rounded="true">
        <content-placeholders-heading/>

        <content-placeholders-heading/>

        <content-placeholders-heading/>
      </content-placeholders>
    </div>
    <div v-else class="d-flex justify-center align-center"  >
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
      docs: [],
      loading: true
    };
  },
  created() {
    this.loading = true;
    this.$http.get("recently-update-docs/").then(response => {
      this.docs = response.data;
    }).catch(() => {
      this.$notify({
        group: "noti",
        type: "error",
        title: "Fail to load recently updated documents."
      });
    }).finally(() => {
      this.loading = false;
    });
  }
};
</script>

<template>
  <v-app app>
    <v-content>
      <v-container class="fill-height w-full d-flex align-start" fluid>
        <div class="ma-auto" v-if="!loaded">
          <v-progress-circular
            indeterminate
            color="green"
          ></v-progress-circular>
        </div>

        <div v-else class="mx-auto col-12 col-md-8 col-lg-5">
          <div class="mt-12">
            <div class="workspace-log d-flex">
              <v-avatar tile style="border-radius: 5px" height="70" width="70">
                <v-img :src="workspace.logo" />
              </v-avatar>
              <div class="d-flex flex-column  ml-4">
                <div class="d-inline-block collection-name">
                  {{ collection.name }}
                </div>
                <div class="font-weight-bold">
                  {{ workspace.name }}
                </div>
              </div>
            </div>

            <v-divider class="my-4" />

            <list-document-item :documents="documents" :show-menu="false">
              <template v-slot:clickable="{ document }">
                <div
                  class="d-flex w-full fill-height align-center pos-absolute mx-2 font-weight-bold"
                  @click="showDocDialog(document.id)"
                >
                  {{ document.name }}
                </div>
              </template>

              <template v-slot:extra-title="{ document }">
                {{ document.name }}
              </template>
            </list-document-item>
          </div>
        </div>
      </v-container>

      <public-document-detail-dialog
        :show="showDialog"
        :document="selectedDocument"
        v-if="selectedDocument"
        @hide="hideDialog"
      />
    </v-content>
  </v-app>
</template>

<script>
import ListDocumentItem from "@/components/app/ListDocumentItem";
import PublicDocumentDetailDialog from "@/components/app/dialogs/PublicDocumentDetail";

export default {
  name: "PublicCollections",
  components: {
    ListDocumentItem,
    PublicDocumentDetailDialog
  },
  data() {
    return {
      collection: null,
      workspace: null,
      documents: [],
      loaded: false,
      selectedDocument: null,
      showDialog: false
    };
  },
  created() {
    let collectionId = this.$route.params.id;

    this.$http
      .get(`public-collections/${collectionId}/`)
      .then(response => {
        let { workspace, children, ...rest } = response.data;
        this.collection = rest;
        this.workspace = workspace;
        this.documents = children;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.loaded = true;
      });
  },
  mounted() {
    window.onhashchange = () => {
      console.log('change');
    }
  },
  methods: {
    showDocDialog(documentId) {
      this.selectedDocument = this.documents.find(doc => doc.id === documentId);
      this.showDialog = true;
    },
    hideDialog() {
      this.showDialog = false;
      this.selectedDocument = null;
      history.pushState(
        {},
        null,
        this.$route.path
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.collection-name {
  font-size: 3rem;
  line-height: initial;
}
</style>

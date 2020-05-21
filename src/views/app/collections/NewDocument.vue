<template>
  <div>
    <v-app-bar fixed flat color="white" class="app-bar-fixed">
      <v-btn icon small>
        <v-icon class="fa fa-chevron-left" small/>
      </v-btn>
      <v-breadcrumbs :items="[{...collection, exact: false}]">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="{ name: 'DetailCollection', params: { id: item.id }}">
            {{ item.name }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div class="ml-auto">
        <v-btn
          small
          outlined
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({draft: true})"
        >
          Save as draft
        </v-btn>
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({draft: false})"
        >
          Save
        </v-btn>
      </div>
    </v-app-bar>

    <docgi-editor @onChangeContent="onChangeContent" />

    <v-dialog
      @click:outside="noLeave"
      @keydown.esc="noLeave"
      width="500"
      ref="confirmLeaveDialog"
      v-model="showConfirmLeave"
    >
      <v-card>
        <v-card-title>
          You have unsaved changes
        </v-card-title>
        <v-card-text>
          Discard them?
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="warning"
            outlined
            small
            class="text-capitalize"
            @click="yesLeave"
          >
            Yes
          </v-btn>
          <v-btn
            color="green"
            outlined
            small
            class="text-capitalize"
            @click="noLeave"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";
import { CREATE_NEW_DOCUMENT } from "@/store/actions.type";

export default {
  name: "NewDocument",
  components: {
    DocgiEditor
  },
  data() {
    return {
      collectionId: null,
      jsonContent: null,
      htmlContent: "",
      showConfirmLeave: false,
      resolveLeave: null,
    };
  },
  created() {
    this.collectionId = this.$route.params.collectionId;
  },
  methods: {
    onChangeContent({ json, html }) {
      this.jsonContent = json;
      this.htmlContent = html;
    },
    createDoc(extraParams) {
      let payload = {
        name: this.docName,
        collection: this.collectionId,
        json_content: this.jsonContent,
        html_content: this.htmlContent,
        draft: extraParams.draft || false
      };
      this.$store
        .dispatch(CREATE_NEW_DOCUMENT, payload)
        .then(response => {
          let documentId = response.data.id;
          this.$router.push({
            name: "DetailDocument",
            params: { id: documentId }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showLeaveDialog() {
      this.showConfirmLeave = true;
      return new Promise(resolve => {
        this.resolveLeave = resolve;
      })
    },
    yesLeave() {
      this.showConfirmLeave = false;
      this.resolveLeave(true);
    },
    noLeave() {
      this.showConfirmLeave = false;
      this.resolveLeave(false);
    }
  },
  computed: {
    docName() {
      if (this.jsonContent) {
        return this.jsonContent.content[0].content[0].text;
      }
      return "";
    },
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.docName || this.htmlContent || this.jsonContent) {
      this.showLeaveDialog().then(answer => {
        next(answer);
      });
    } else {
      next();
    }
  }
};
</script>

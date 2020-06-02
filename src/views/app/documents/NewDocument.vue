<template>
  <div>
    <v-app-bar fixed flat color="white" class="app-bar-fixed">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.to" exact style="padding-top: 7px">
            <div class="d-flex">
              <v-icon v-if="item.isCollection" size="20" :color="item.color">
                {{ "fa-folder-open" }}
              </v-icon>
              <span style="margin-top: 5px;" class="ml-2">
                {{ item.name }}
              </span>
            </div>
          </v-breadcrumbs-item>
        </template>

        <template v-slot:divider>
          <div style="padding-top: 12px">/</div>
        </template>
      </v-breadcrumbs>

      <div class="ml-auto">
        <v-btn
          small
          outlined
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({ draft: true })"
        >
          Save as draft
        </v-btn>
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({ draft: false })"
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
import { SET_DRAWER } from "@/store/mutations.type";

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
      document: null
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
          this.document = response.data;
          this.$router.push({
            name: "DetailDocument",
            params: { id: this.document.id }
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
      });
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
      if (
        this.jsonContent &&
        this.jsonContent.content[0].type === "title" &&
        this.jsonContent.content[0].content &&
        this.jsonContent.content[0].content.length > 0 &&
        Object.hasOwnProperty.call(
          this.jsonContent.content[0].content[0],
          "text"
        )
      ) {
        return this.jsonContent.content[0].content[0].text;
      }
      return "";
    },
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    },
    breadcrumbs() {
      if (this.collection) {
        return [
          {
            name: this.collection.name,
            disabled: false,
            to: {
              name: "DetailCollection",
              params: { id: this.collection.id }
            },
            isCollection: true,
            color: this.collection.color
          },
          {
            name: this.docName,
            disabled: true,
            to: "",
            isCollection: false
          }
        ];
      }
      return [];
    }
  },
  beforeRouteLeave(to, from, next) {
    // Ignore show dialog confirm leave when save document
    this.$store.commit(SET_DRAWER, true);
    if (
      this.document &&
      to.name === "DetailDocument" &&
      to.params.id === this.document.id
    ) {
      next(true);
    }

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

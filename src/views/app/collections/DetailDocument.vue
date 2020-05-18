<template>
  <div v-if="document">
    <v-app-bar fixed flat color="white" class="app-bar-fixed" hide-on-scroll>
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div class="ml-auto">
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="saveEditDoc(document.draft)"
          outlined
          v-if="editable"
        >
          Save
        </v-btn>
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="saveEditDoc(false)"
          v-if="editable && document.draft"
        >
          Publish
        </v-btn>
        <v-menu v-if="!editable">
          <template v-slot:activator="{ on }">
            <v-btn small icon v-on="on">
              <v-icon small class="fa fa-ellipsis-h" />
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              class="pa-0"
              v-for="(item, index) in menuItems"
              :key="index"
            >
              <v-btn
                small
                text
                class="text-capitalize w-full justify-start"
                :color="item.color || ''"
                @click="item.handler"
              >
                <template v-slot:default>
                  <v-icon small>{{ item.icon }}</v-icon>
                  <span class="ml-2">{{ item.title }}</span>
                </template>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <docgi-editor
      :content="document.html_content"
      :editable="editable"
      :key="document.id"
      @onChangeContent="onChangeContent"
    />

    <delete-document-dialog
      :document="document"
      :show="showDeleteDialog"
      @hide="showDeleteDialog = false"
    />
  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";
import DeleteDocumentDialog from "@/components/app/dialogs/DeleteDocumentDialog";
import { UPDATE_DOCUMENT } from "@/store/mutations.type";

export default {
  name: "DetailDocument",
  metaInfo: {

  },
  components: { DocgiEditor, DeleteDocumentDialog },
  data() {
    return {
      document: null,
      jsonContent: null,
      htmlContent: "",
      editable: false,
      menuItems: [
        {
          title: "Edit",
          icon: "fa-pen",
          handler: () => {
            this.editable = true;
          }
        },
        {
          title: "Delete",
          icon: "fa-trash-alt",
          color: "red lighten-2",
          handler: () => {
            this.showDeleteDialog = true;
          }
        }
      ],
      showDeleteDialog: false
    };
  },
  async created() {
    try {
      let response = await this.$http.get(
        `documents/${this.$route.params.id}/`
      );
      this.document = response.data;
    } catch (e) {
      console.log(e); // Todo
    }
  },
  methods: {
    saveEditDoc(draft) {
      this.editable = false;
      if (
        !this.docName &&
        !this.jsonContent &&
        !this.htmlContent &&
        draft === this.document.draft
      ) {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Nothing update."
        });
        return;
      }
      let payload = {
        name: this.docName,
        json_content: this.jsonContent,
        html_content: this.htmlContent,
        draft: draft
      };
      this.$http
        .put(`documents/${this.document.id}/`, payload)
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Update successful."
          });

          this.jsonContent = "";
          this.htmlContent = "";
          this.document = response.data;
          this.$store.commit(UPDATE_DOCUMENT, response.data);
        })
        .catch(error => {
          // Todo
          console.log(error);
        });
    },
    onChangeContent({ json, html }) {
      this.jsonContent = json;
      this.htmlContent = html;
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
      if (this.document) {
        return this.$store.getters.getCollectionById(this.document.collection);
      }
      return null;
    },
    breadcrumbs() {
      if (this.collection) {
        return [
          {
            text: this.collection.name,
            disabled: false,
            to: { name: "DetailCollection", params: { id: this.collection.id } }
          },
          {
            text: this.document.name,
            disabled: true,
            to: { name: "DetailCollection", params: { id: this.collection.id } }
          }
        ];
      }
      return [];
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
};
</script>

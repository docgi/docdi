<template>
  <div>
    <div v-if="!document" class="mx-6">
      <content-placeholders :rounded="true">
        <content-placeholders-img />
        <content-placeholders-heading />
        <content-placeholders-heading />
        <content-placeholders-heading />
      </content-placeholders>
    </div>

    <div v-if="document">
      <v-app-bar fixed flat color="white" class="app-bar-fixed" hide-on-scroll>
        <v-progress-linear
          :active="isSaving"
          :indeterminate="isSaving"
          top
          absolute
          color="deep-purple accent-4"
        ></v-progress-linear>

        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :to="item.to"
              :disabled="item.disabled"
              style="padding-top: 7px"
            >
              <div class="d-flex">
                <v-icon size="20" :color="item.color" v-if="item.isCollection">
                  {{ "fa-folder-open" }}
                </v-icon>
                <span style="margin-top: 5px;" class="ml-2">
                {{ item.name }}
              </span>
              </div>
            </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
            <div style="padding-top: 12px;">/</div>
          </template>
        </v-breadcrumbs>

        <div class="ml-auto d-flex align-center">
          <list-user-display :users="document.contributors" />
          <v-divider class="mx-2" vertical />
          <v-btn
            small
            color="primary"
            class="mr-2 text-capitalize"
            @click="enableEdit"
            v-if="!editable"
          >
            Edit
          </v-btn>
          <v-btn
            small
            outlined
            class="mr-2 text-capitalize"
            @click="saveEditDoc(false)"
            v-if="editable && document.draft"
          >
            Publish
          </v-btn>
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
        @onChangeName="changeName"
        @onChangeContent="onChangeContent"
        ref="editor"
      />

      <delete-document-dialog
        :document="document"
        :show="showDeleteDialog"
        @hide="showDeleteDialog = false"
      />

      <v-dialog
        @click:outside="noLeave"
        @keydown.esc="noLeave"
        width="500"
        ref="confirmLeaveDialog"
        v-model="showConfirmLeave"
      >
        <v-card>
          <v-card-title>
            You have unsaved changes in
            <strong class="ml-2">{{ document.name }}</strong>
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
  </div>
</template>

<script>
import DocgiEditor from "@/components/editor/DocgiEditor";
import DeleteDocumentDialog from "@/components/app/dialogs/DeleteDocumentDialog";
import { UPDATE_DOCUMENT } from "@/store/mutations.type";
import ListUserDisplay from "@/components/app/ListUserDisplay";

const IDLE_TIMEOUT = 800;  // 0.7 second

export default {
  name: "DetailDocument",
  metaInfo: {},
  components: { ListUserDisplay, DocgiEditor, DeleteDocumentDialog },
  data() {
    return {
      document: null,
      docName: "",
      jsonContent: null,
      htmlContent: "",
      editable: false,
      isSaved: true,
      isSaving: false,
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
      showDeleteDialog: false,
      showConfirmLeave: false,
      resolveLeave: null,
      autoSaveTimeoutId: null
    };
  },
  async created() {
    try {
      let response = await this.$http.get(
        `documents/${this.$route.params.id}/`
      );
      this.document = response.data;

      let isNew = this.$route.query.new;
      if (isNew) {
        this.editable = true;
      }
    } catch (e) {
      this.$notify({
        group: "noti",
        type: "error",
        title: "Fail to load document"
      })
    }
  },
  methods: {
    enableEdit() {
      this.editable = true;
    },
    resetData() {
      this.editable = false;
      this.jsonContent = null;
      this.htmlContent = null;
    },
    getDocument(documentId) {
      return this.$http.get(`documents/${documentId}/`);
    },
    makePayload(draft) {
      let payload = { draft };
      if (this.docName) {
        payload.name = this.docName;
      }
      if (this.jsonContent) {
        payload.json_content = this.jsonContent;
      }
      if (this.htmlContent) {
        payload.html_content = this.htmlContent;
      }
      return payload;
    },
    saveEditDoc(draft) {
      this.isSaving = true;
      let payload = this.makePayload(draft);
      this.$http
        .patch(`documents/${this.document.id}/`, payload)
        .then(response => {
          this.$notify({
            group: "noti",
            type: "success",
            title: "Update successful."
          });
          this.document = response.data;
          this.isSaved = true;
          this.$store.commit(UPDATE_DOCUMENT, response.data);
          this.editable = false;
        })
        .catch(() => {
          this.$notify({
            group: "noti",
            type: "error",
            title: "Update failed."
          });
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    onChangeContent({ json, html }) {
      if (this.autoSaveTimeoutId) {
        clearTimeout(this.autoSaveTimeoutId);
      }
      this.isSaved = false;
      this.jsonContent = json;
      this.htmlContent = html;
      this.autoSaveTimeoutId = setTimeout(() => {
        let payload = {
          name: this.docName,
          json_content: this.jsonContent,
          html_content: this.htmlContent
        }
        this.isSaving = true;
        this.$http.patch(`documents/${this.document.id}/`, payload)
          .then((response) => {
            this.isSaved = true;
            this.document = response.data;
            this.$store.commit(UPDATE_DOCUMENT, response.data);
            this.isSaving = false;
          })
      }, IDLE_TIMEOUT);
    },
    changeName(name) {
      this.docName = name;
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
            name: this.document.name,
            disabled: true,
            to: {
              name: "DetailCollection",
              params: { id: this.collection.id }
            },
            isCollection: false
          }
        ];
      }
      return [];
    }
  },
  async beforeRouteUpdate(to, from, next) {
    if (!this.isSaved) {
      this.showLeaveDialog().then(answer => {
        if (answer) {
          this.getDocument(to.params.id)
            .then(response => {
              this.document = response.data;
              this.resetData();
              next();
            })
            .catch(() => {
              this.$notify({
                group: "noti",
                type: "error",
                title: "Fail to load document"
              })
            });
        }
      });
    } else {
      try {
        let response = await this.getDocument(to.params.id);
        this.document = response.data;
      } catch (e) {
        this.$notify({
          group: "noti",
          type: "error",
          title: "Fail to load document"
        })
      }
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      this.showLeaveDialog().then(answer => {
        next(answer);
      });
    } else {
      next();
    }
  }
};
</script>

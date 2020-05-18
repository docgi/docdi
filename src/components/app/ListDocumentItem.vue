<template>
  <div class="w-full fill-height">
    <v-list class="w-full">
      <v-list-item
        v-for="(document, index) in documents"
        :key="index"
        class="px-0 py-0 pos-relative mb-1 doc-item my-4"
        style="margin-left: -8px; margin-right: -8px"
      >
        <router-link
          tag="div"
          class="d-flex w-full fill-height align-center pos-absolute mx-2"
          :to="{ name: 'DetailDocument', params: { id: document.id } }"
        >
          <div class="d-flex flex-column fill-height justify-center">
          <span
            class="font-weight-bold mt-1"
          >
            {{ document.name }}
          </span>
            <span class="font-weight-thin" style="font-size: 0.75em;">
            Updated by
            <v-chip label x-small>
              {{ document.last_update_by ? document.last_update_by.username : document.creator.username }}
            </v-chip>
            {{ beautyLastUpdate(document.modified) }}
          </span>
          </div>
        </router-link>

        <div class="ml-auto mr-4">
          <v-chip x-small v-if="document.draft" class="mr-2">
            Draft
          </v-chip>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                icon
                v-on="on"
                class="item-menu-button"
                style="visibility: hidden"
              >
                <v-icon small class="fa fa-ellipsis-h" />
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item
                class="pa-0"
                v-for="(item, index) in documentMenuItems"
                :key="index"
              >
                <v-btn
                  small
                  text
                  class="text-capitalize w-full justify-start"
                  :color="item.color || ''"
                  @click="item.handler(document)"
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
      </v-list-item>
    </v-list>

    <delete-document-dialog
      v-if="selectedDocument"
      :document="selectedDocument"
      @hide="selectedDocument = null"
      :show="!!selectedDocument"
    />
  </div>
</template>

<script>
import { getUpdatedText } from "@/common/utils";
import DeleteDocumentDialog from "@/components/app/dialogs/DeleteDocumentDialog";

export default {
  name: "ListDocumentItem",
  props: {
    documents: {
      type: Array,
      required: true
    }
  },
  components: {
    DeleteDocumentDialog
  },
  data() {
    return {
      selectedDocument: null,
      documentMenuItems: [
        {
          title: "Edit...",
          icon: "fa-pen",
          handler: (document) => {
            this.$router.push({ name: "DetailDocument", params: {id: document.id} })
          }
        },
        {
          title: "Delete",
          icon: "fa-trash-alt",
          color: "red lighten-2",
          handler: (document) => {
            this.selectedDocument = document;
          }
        }
      ]
    };
  },
  methods: {
    beautyLastUpdate(date) {
      return getUpdatedText(date);
    }
  }
};
</script>

<style lang="scss" scoped>
.doc-item {
  cursor: pointer;
  border-radius: 7px;

  &:hover {
    background-color: #e8e8e8;

    ::v-deep .item-menu-button {
      visibility: initial !important;
    }
  }
}
</style>

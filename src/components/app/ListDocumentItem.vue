<template>
  <v-list class="w-full">
    <v-list-item
      v-for="(item, index) in documents"
      :key="index"
      class="px-0 py-0 pos-relative mb-1 doc-item my-2"
      style="margin: 0 -8px 0 -8px"
    >
      <router-link
        tag="div"
        class="d-flex w-full fill-height align-center pos-absolute mx-2"
        :to="{ name: 'DetailDocument', params: { id: item.id } }"
      >
        <div class="d-flex flex-column fill-height justify-center">
          <span
            class="font-weight-bold mt-1"
            style="width: 80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >
            {{ item.name }}
          </span>
          <span class="ml-2 font-weight-thin" style="font-size: 0.75em;">
            Updated by
            <v-chip label x-small>{{ item.creator.username }}</v-chip>
            {{ beautyLastUpdate(item.modified) }}
          </span>
        </div>
      </router-link>

      <div class="ml-auto mr-4">
        <v-chip x-small v-if="item.draft" class="mr-2">
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
    </v-list-item>
  </v-list>
</template>

<script>
import { getUpdatedText } from "@/common/utils";

export default {
  name: "ListDocumentItem",
  props: {
    documents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: "New doc",
          icon: "fa-plus",
          handler: () => {
            this.$router.push({
              name: "NewDocument",
              params: { collectionId: this.collectionId }
            });
          }
        },
        {
          title: "Edit info",
          icon: "fa-pen",
          handler: () => {
            this.showUpdateDialog = true;
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

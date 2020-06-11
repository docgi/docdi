<template>
  <div v-if="collection">
    <div class="d-flex align-center">
      <v-icon x-large :color="collection.color">
        {{ "fa-folder-open" }}
      </v-icon>

      <div class="ml-4 header d-flex" style="padding-top: 7px;">
        <div>{{ collection.name }}</div>
        <v-chip v-if="collection.private" x-small>Private</v-chip>
      </div>

      <div class="ml-auto">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn small icon v-on="on">
              <v-icon class="fa fa-ellipsis-h" />
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
    </div>

    <v-tabs v-model="tab">
      <v-tab
        v-for="(item, index) in tabItems"
        :key="index"
        class="justify-start pa-0 mr-4"
        style="min-width: fit-content"
      >
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>

    <v-divider />

    <v-tabs-items v-model="tab">

      <v-tab-item>
        <detail-collection-tab :collectionId="collection.id" only-published/>
      </v-tab-item>

      <v-tab-item>
        <detail-collection-tab :collectionId="collection.id" only-draft/>
      </v-tab-item>

    </v-tabs-items>

    <!--  Delete collection dialog  -->
    <delete-collection-dialog
      :show="showDeleteDialog"
      :collection="collection"
      @hide="showDeleteDialog = false"
    />

    <!--  Update collection info  -->
    <update-collection-dialog
      :show="showUpdateDialog"
      :collection-id="collectionId"
      @hide="showUpdateDialog = false"
      :key="collectionId"
    />

    <get-share-link-collection-dialog
      :show="showGetPublicLink"
      :collectionId="collectionId"
      @hide="showGetPublicLink = false"
      v-if="showGetPublicLink"
    />
  </div>
</template>

<script>
import DeleteCollectionDialog from "@/components/app/dialogs/DeleteCollectionDialog";
import UpdateCollectionDialog from "@/components/app/dialogs/UpdateCollectionDialog";
import GetShareLinkCollectionDialog from "@/components/app/dialogs/GetShareLinkCollection";

// Tabs
import DetailCollectionTab from "@/components/app/tabs/DetailCollectionTab";

import { SET_TREE_VIEW_OPEN_COLLECTIONS } from "@/store/mutations.type";

export default {
  name: "DetailCollection",
  components: {
    DeleteCollectionDialog,
    UpdateCollectionDialog,
    GetShareLinkCollectionDialog,
    DetailCollectionTab
  },
  data() {
    return {
      collectionId: null,
      tab: null,
      showDeleteDialog: false,
      showUpdateDialog: false,
      showGetPublicLink: false,
      tabItems: [
        {
          title: "Documents",
        },
        {
          title: "My drafts",
        }
      ],
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
          title: "Get share link",
          icon: "fa-share",
          handler: () => {
            this.showGetPublicLink = true;
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
  created() {
    let hash = this.$route.hash;
    for (let index = 0; index < this.tabItems.length; index++) {
      if (`#${this.tabItems[index].hash}` === hash) {
        this.tab = index;
        break;
      }
    }
    this.tab = 0;
  },
  mounted() {
    this.collectionId = this.$route.params.id;
    this.$store.commit(SET_TREE_VIEW_OPEN_COLLECTIONS, [this.collectionId]);
  },
  beforeRouteUpdate(to, from, next) {
    this.collectionId = to.params.id;
    this.tab = 0;
    next();
  },
  computed: {
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    }
  },
  methods: {
    tabChange(index) {
      history.pushState(
        {},
        null,
        this.$route.path + "#" + this.tabItems[index].hash
      );
    }
  }
};
</script>

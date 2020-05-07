<template>
  <div v-if="collection">
    <div class="d-flex align-center">
      <v-icon x-large :color="collection.color">
        {{ "fa-folder-open" }}
      </v-icon>

      <span class="ml-4 header" style="padding-top: 7px;">
        {{ collection.name }}
      </span>

      <div class="ml-auto">
        <v-menu v-model="showMenu">
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

    <v-tabs v-model="tab" @change="tabChange">
      <v-tab v-for="(item, index) in tabItems" :key="index">
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in tabItems" :key="index">
        <v-card flat>
          <v-card-text
            v-if="item.title === 'Docs'"
            class="d-flex justify-center"
          >
            <div v-if="collection.children.length === 0">
              This collection is empty.
              <v-btn color="primary" small class="text-capitalize" :to="{name: 'NewDocument', params: { collectionId: collectionId }}">
                <template v-slot:default>
                  <v-icon small class="fa fa-plus mr-2" />
                  <span style="padding-top: 2px">
                    New document
                  </span>
                </template>
              </v-btn>
            </div>

            <v-list v-else>
              <v-list-item v-for="(item, index) in collection.children" :key="index">
                <v-list-item-content>{{ item.name }}</v-list-item-content>
              </v-list-item>
            </v-list>

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!--  Delete collection dialog  -->
    <delete-collection-dialog
      :show="showDeleteDialog"
      :collection-name="collection.name"
      @hide="showDeleteDialog = false"
    />

    <!--  Update collection info  -->
    <update-collection-dialog
      :show="showUpdateDialog"
      :collection-id="collectionId"
      @hide="showUpdateDialog = false"
    />

  </div>
</template>

<script>
import DeleteCollectionDialog from "@/components/app/dialogs/DeleteCollectionDialog";
import UpdateCollectionDialog from "@/components/app/dialogs/UpdateCollectionDialog";

export default {
  name: "DetailCollection",
  components: {
    DeleteCollectionDialog,
    UpdateCollectionDialog
  },
  data() {
    return {
      collectionId: null,
      tab: null,
      showMenu: false,
      showDeleteDialog: false,
      showUpdateDialog: false,
      tabItems: [
        {
          title: "Docs",
          hash: ""
        },
        {
          title: "Recently update",
          hash: "recently-update"
        },
        {
          title: "Search",
          hash: "search"
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

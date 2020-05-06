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
          <v-card-text v-if="item.title === 'Docs'">
            <div v-if="collection.children.length === 0">
              This collection is empty.
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!--  Delete collection dialog  -->
    <v-dialog v-model="showDeleteDialog" width="500">
      <v-card>
        <v-card-title>
          Delete <strong class="ml-2">{{ collection.name }}</strong>
        </v-card-title>
        <v-card-text>
          All docs contain in this collection will be deleted.
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" outlined small @click="deleteCollection">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  Edit collection info  -->
    <v-dialog v-model="showEditDialog" width="500">
      <v-card>
        <v-card-title>Edit collection</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field
                autofocus
                dense
                outlined
                label="Collection name"
                v-model="editCollection.name"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="editCollection.color"
                :items="colors"
                label="Color"
                outlined
                dense
              >
                <template v-slot:item="{ item }" class="w-full">
                  <span
                    :style="
                      'width: 100%; height: 25px; border-radius: 5px;' +
                        `background: ${item};`
                    "
                  ></span>
                </template>
                <template v-slot:selection="{ item }" class="w-full">
                  <span
                    :style="
                      'width: 100%; height: 25px; border-radius: 5px;' +
                        `background: ${item};`
                    "
                  ></span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="primary" outlined small @click="updateCollection">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  DELETE_COLLECTION,
  UPDATE_COLLECTION_INFO
} from "@/store/actions.type";
import { DEFAULT_COLORS } from "@/common/constants";

export default {
  name: "DetailCollection",
  data() {
    return {
      collectionId: null,
      tab: null,
      showMenu: false,
      showDeleteDialog: false,
      showEditDialog: false,
      editCollection: {},
      colors: DEFAULT_COLORS,
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
            this.showEditDialog = true;
            this.editCollection = { ...this.collection };
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
    },
    updateCollection() {
      this.$store.dispatch(UPDATE_COLLECTION_INFO, this.editCollection);
    },
    deleteCollection() {
      this.$store.dispatch(DELETE_COLLECTION, this.collectionId).then(() => {
        this.showDeleteDialog = false;
        this.$router.push({ name: "Dashboard" });
      });
    }
  }
};
</script>

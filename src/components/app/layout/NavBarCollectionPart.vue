<template>
  <v-list dense color="#EDF2F7">
    <v-subheader>Working space</v-subheader>
    <v-list-group
      class="list-group-custom"
      :value="openingGroup === 'document'"
      @click="updateOpenGroup('document')"
    >
      <template v-slot:activator>
        <v-list-item-icon class="mr-2">
          <v-icon class="far fa-edit" small></v-icon>
        </v-list-item-icon>
        <v-list-item-title class="font-weight-bold">
          Documents
        </v-list-item-title>
      </template>
      <v-list-item-group>
        <v-treeview
          hoverable
          dense
          class="v-tree-custom"
          expand-icon="fa-angle-down"
          :items="collections"
          item-key="id"
          :key="key"
          :open="openingCols"
          ref="tree"
          @update:open="updateOpenCol"
        >
          <template v-slot:label="{ item, open }">
            <!--     is collection     -->
            <router-link
              class="custom-link"
              v-if="item.is_collection"
              :to="{ name: 'DetailCollection', params: { id: item.id } }"
            >
              <v-icon size="20" :color="item.color">
                {{ open ? "fa-folder-open" : "fa-folder" }}
              </v-icon>
              <span class="ml-2" style="margin-top: 3px;">{{ item.name }}</span>

              <v-chip
                v-if="item.private"
                class="ml-auto"
                style="margin-top: 3px;"
                x-small
              >
                Private
              </v-chip>
            </router-link>

            <!--     is document     -->
            <router-link
              class="custom-link"
              v-else
              :to="{ name: 'DetailDocument', params: { id: item.id } }"
            >
              <v-icon class="far fa-file-alt" small />
              <div class="ml-2 font-weight-bold">{{ item.name }}</div>
            </router-link>
          </template>
        </v-treeview>
        <v-list-item dense @click="showNewCollectionDialog">
          <v-list-item-icon class="mr-2">
            <v-icon class="fa fa-plus" small />
          </v-list-item-icon>
          <v-list-item-content class="pb-1">
            <v-list-item-title v-text="'New Collections'" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>

    <v-list-group
      class="list-group-custom"
      :value="openingGroup === 'kanban'"
      @click="updateOpenGroup('kanban')"
    >
      <template v-slot:activator>
        <v-list-item-icon class="mr-2">
          <v-icon class="fab fa-trello" small></v-icon>
        </v-list-item-icon>
        <v-list-item-title class="font-weight-bold">
          Boards
        </v-list-item-title>
      </template>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import { LOAD_ROOT_COLLECTIONS } from "@/store/actions.type";
import { SET_DIALOG } from "@/store/mutations.type";

const OPEN_COLLECTION_KEY = "openingCols";
const OPEN_GROUP_KEY = "openingGroup";

export default {
  name: "NavBarCollectionPart",
  created() {
    let openingCols = localStorage.getItem(OPEN_COLLECTION_KEY);
    let openingGroups = localStorage.getItem(OPEN_GROUP_KEY);
    if (openingCols) {
      this.openingCols = JSON.parse(openingCols);
    }

    if (openingGroups) {
      this.openingGroup = JSON.parse(openingGroups);
    }
  },
  mounted() {
    this.$store.dispatch(LOAD_ROOT_COLLECTIONS);
  },
  data() {
    return {
      openingCols: [],
      openingGroup: ""
    };
  },
  computed: {
    ...mapGetters({
      getDrawer: "getDrawer",
      collections: "getCollectionForTree",
      documents: "getDocuments"
    }),
    key() {
      if (this.documents.length > 0) {
        let max = Date.parse(this.documents[0].modified);
        this.documents.forEach(item => {
          let next = Date.parse(item.modified);
          if (next > max) {
            max = next;
          }
        });
        return max;
      }
      return new Date().getTime();
    }
  },
  methods: {
    showNewCollectionDialog() {
      this.$store.commit(SET_DIALOG, { newCollection: true });
    },
    updateOpenCol(opens) {
      // Because when `created` the getter `collections` is empty and also make
      // treeview fire `update.open` with empty array. This makes cached value from
      // localStorage not effects.
      if (this.collections.length > 0) {
        this.openingCols = opens;
        localStorage.setItem(OPEN_COLLECTION_KEY, JSON.stringify(opens));
      }
    },
    updateOpenGroup(value) {
      let current = localStorage.getItem(OPEN_GROUP_KEY);
      if (current && JSON.parse(current) === value) { // For on close
        localStorage.setItem(OPEN_GROUP_KEY, "");
        return
      }
      localStorage.setItem(OPEN_GROUP_KEY, JSON.stringify(value));
    }
  }
};
</script>

<style scoped lang="scss">
.custom-link {
  width: auto;
  display: flex;
  text-decoration: none;
  color: black;
  font-size: 0.75rem;
}

.v-tree-custom {
  &::v-deep button {
    font-size: 16px;
  }

  &::v-deep .v-treeview-node__root {
    padding-left: 20px;
  }
}

.list-group-custom {
  &::v-deep i {
    font-size: 16px;
  }
}
</style>

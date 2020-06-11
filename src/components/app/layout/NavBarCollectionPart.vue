<template>
  <v-list dense color="#EDF2F7">
    <v-list-item-group>
      <v-treeview
        hoverable
        dense
        expand-icon="fa-angle-down"
        :items="collections"
        item-key="id"
        class="v-tree-custom"
        :key="documents.length"
        :open.sync="open"
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
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import { LOAD_ROOT_COLLECTIONS } from "@/store/actions.type";
import { SET_DIALOG } from "@/store/mutations.type";

export default {
  name: "NavBarCollectionPart",
  mounted() {
    this.$store.dispatch(LOAD_ROOT_COLLECTIONS);
  },
  data() {
    return {
      open: []
    }
  },
  computed: {
    ...mapGetters({
      getDrawer: "getDrawer",
      collections: "getCollections",
      documents: "getDocuments"
    })
  },
  methods: {
    showNewCollectionDialog() {
      this.$store.commit(SET_DIALOG, { newCollection: true });
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

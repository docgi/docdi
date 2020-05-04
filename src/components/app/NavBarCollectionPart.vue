<template>
  <v-list dense color="#EDF2F7">
    <v-subheader>Collections</v-subheader>
    <v-list-item-group>
      <v-treeview
        hoverable
        activatable
        dense
        open-on-click
        item-key="uuid"
        expand-icon="fa-angle-down"
        :return-object="true"
        :items="collections"
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon small v-if="item.is_collection">
            {{ open ? "fa-folder-open" : "fa-folder" }}
          </v-icon>
          <v-icon small v-else>
            {{ "fa-file-alt" }}
          </v-icon>
        </template>

        <template v-slot:label="{ item }">
          <router-link class="custom-link" v-if="item.is_collection" :to="{name: 'DetailCollection', params: {id: item.id}}">{{ item.name }}</router-link>
          <router-link class="custom-link" v-else :to="{name: 'DetailDocument', params: {id: item.id}}">{{ item.name }}</router-link>
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
  computed: {
    ...mapGetters({ getDrawer: "getDrawer", collections: "getCollections" })
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
  display: block;
  text-decoration: none;
  color: black;
  font-size: 0.8125rem;
  padding-top: 5px;
}
</style>

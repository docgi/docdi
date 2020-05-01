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
        @update:open="updateActive"
        @update:active="updateActive"
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
          <span class="font-weight-bold" style="font-size: 12px">
            {{ item.name }}
          </span>
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
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch(LOAD_ROOT_COLLECTIONS);
  },
  computed: {
    ...mapGetters({ getDrawer: "getDrawer", collections: "getCollections" })
  },
  methods: {
    updateActive(objs) {
      let obj = objs[0];
      if (obj) {
        if ("is_collection" in obj) {
          this.$router
            .push({ name: "DetailCollection", params: { id: obj.id } })
            .catch(() => {});
        } else {
          this.$router
            .push({ name: "DetailDocument", params: { id: obj.id } })
            .catch(() => {});
        }
      }
    },
    showNewCollectionDialog() {
      this.$store.commit(SET_DIALOG, { newCollection: true });
    }
  }
};
</script>

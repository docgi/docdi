<template>
  <v-dialog width="500" v-model="showDialog.newDocument">
    <v-card>
      <v-card-title>
        Choose collection
      </v-card-title>
      <v-card-text style="padding-left: 10px; padding-right: 10px">
        <div v-if="collections.length  === 0" class="mx-4">
          You has no collection
          <v-btn class="text-capitalize" color="primary" small @click="createNewCollection">
            <v-icon class="fa fa-plus mr-2" small/> Create one
          </v-btn>
        </div>
        <v-list v-else>
          <v-list-item
            v-for="(col, key) of collections"
            :key="key"
            class="px-0 py-0 pos-relative"
          >
            <div
              class="d-flex w-full fill-height align-center pos-absolute col-item px-4"
              @click="goToNewDocument(col.id)"
            >
              <v-icon class="fa fa-folder-open" :color="col.color" />
              <span class="font-weight-bold mt-1 mx-2">
                {{ col.name }}
              </span>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DIALOG } from "@/store/mutations.type";

export default {
  name: "ChooseCollection",
  methods: {
    goToNewDocument(collectionId) {
      this.$store.commit(SET_DIALOG, { newDocument: false });
      this.$router.push({ name: "NewDocument", params: { collectionId } });
    },
    createNewCollection() {
      this.$store.commit(SET_DIALOG, { newCollection: true });
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.getters.getDialog;
      },

      set(value) {
        this.$store.commit(SET_DIALOG, { newDocument: value });
      }
    },
    ...mapGetters({
      collections: "getCollections"
    })
  }
};
</script>


<style lang="scss" scoped>
.col-item {
  cursor: pointer;
  border-radius: 7px;

  &:hover {
    background-color: #e8e8e8;
  }
}
</style>

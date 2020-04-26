<template>
  <v-dialog
    v-model="getDialog.newCollection"
    max-width="490"
    @click:outside="showOff"
    @keydown.esc="showOff"
  >
    <v-card>
      <v-card-title>
        New collection
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column">
          <v-text-field dense outlined label="Collection name" :error-messages="error" v-model="collection.name"/>
          <v-switch v-model="collection.private" label="Private" class="ml-2 mt-1"/>
        </div>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn color="green darken-1" outlined small @click="create">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DIALOG } from "@/store/mutations.type";
import {CREATE_NEW_COLLECTION} from "@/store/actions.type";

export default {
  name: "NewCollectionDialog",
  data() {
    return {
      collection: {
        name: "",
        private: false,
      },
      error: []
    };
  },
  computed: {
    ...mapGetters(["getDialog"])
  },
  methods: {
    showOff() {
      this.collection = {
        name: "",
        private: false,
      };
      this.$store.commit(SET_DIALOG, {
        newCollection: false
      });
    },
    create() {
      this.$store.dispatch(CREATE_NEW_COLLECTION, this.collection).then(() => {
        this.showOff();
      }).catch(err => {
        this.error = err.response.data;
      })
    }
  }
};
</script>

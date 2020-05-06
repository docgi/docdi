<template>
  <v-dialog
    v-model="getDialog.newCollection"
    max-width="500"
    @click:outside="showOff"
    @keydown.esc="showOff"
  >
    <v-card>
      <v-card-title>
        New collection
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-text-field
              autofocus
              dense
              outlined
              label="Collection name"
              :error-messages="error.name"
              v-model="collection.name"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="collection.color"
              :items="colors"
              label="Color"
              outlined
              dense
            >
              <template v-slot:item="{ item }" class="w-full">
                <span :style="'width: 100%; height: 25px; border-radius: 7px;' + `background: ${item};`"></span>
              </template>
              <template v-slot:selection="{ item }" class="w-full">
                <span :style="'width: 100%; height: 25px; border-radius: 7px;' + `background: ${item};`"></span>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-switch v-model="collection.private" label="Private" />
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          outlined
          small
          @click="createCollection"
          :disabled="!validPayload"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DIALOG } from "@/store/mutations.type";
import { CREATE_NEW_COLLECTION } from "@/store/actions.type";

export default {
  name: "NewCollectionDialog",
  data() {
    return {
      collection: {
        name: "",
        private: false,
        color: "#4E5C6E"
      },
      colors: [
        "#4E5C6E",
        "#19B7FF",
        "#7F6BFF",
        "#FC7419",
        "#FC2D2D",
        "#14CF9F",
      ],
      error: {}
    };
  },
  computed: {
    ...mapGetters(["getDialog"]),
    validPayload() {
      return !!this.collection.name;
    }
  },
  methods: {
    showOff() {
      this.error = {};
      this.collection = {
        name: "",
        private: false
      };
      this.$store.commit(SET_DIALOG, {
        newCollection: false
      });
    },
    createCollection() {
      this.error = {};
      this.$store
        .dispatch(CREATE_NEW_COLLECTION, this.collection)
        .then(() => {
          this.showOff();
        })
        .catch(err => {
          this.error = err.response.data;
        });
    }
  }
};
</script>

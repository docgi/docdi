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
              v-model.trim="collection.name"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="collection.color"
              :items="colors"
              :value="collection.color"
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
          color="primary"
          class="text-capitalize"
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
import {DEFAULT_COLORS} from "@/common/constants";

export default {
  name: "NewCollectionDialog",
  data() {
    return {
      collection: {
        name: "",
        private: false,
        color: DEFAULT_COLORS[0]
      },
      colors: DEFAULT_COLORS,
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
        .then((response) => {
          this.showOff();
          this.$router.push({ name: "DetailCollection", params: { id: response.data.id } })
        })
        .catch(err => {
          this.error = err.response.data;
        });
    }
  }
};
</script>

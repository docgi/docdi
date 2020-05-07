<template>
  <v-dialog
    v-model="show"
    width="500"
    @click:outside="$emit('hide')"
    @keydown.esc="$emit('hide')"
  >
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
        <v-btn
          color="primary"
          outlined
          small
          @click="updateCollection"
          class="text-capitalize"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DEFAULT_COLORS } from "@/common/constants";
import { UPDATE_COLLECTION_INFO } from "@/store/actions.type";

export default {
  name: "UpdateCollectionDialog",
  props: {
    show: {
      required: true,
      type: Boolean
    },
    collectionId: {
      required: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      colors: DEFAULT_COLORS,
      collection: {
        name: "",
        color: ""
      }
    };
  },
  created() {
    this.collection = {
      ...this.$store.getters.getCollectionById(this.collectionId)
    };
  },
  methods: {
    updateCollection() {
      this.$store.dispatch(UPDATE_COLLECTION_INFO, this.collection);
    }
  }
};
</script>

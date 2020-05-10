<template>
  <v-dialog v-model="show"
            width="500"
            @click:outside="$emit('hide')"
            @keydown.esc="$emit('hide')"
  >
    <v-card>
      <v-card-title>
        Delete <strong class="ml-2">{{ collection.name }}</strong>
      </v-card-title>
      <v-card-text>
        All docs contain in this collection will be deleted.
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="error" outlined small @click="deleteCollection" class="text-capitalize">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {DELETE_COLLECTION} from "@/store/actions.type";

export default {
  name: "DeleteCollectionDialog",
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    collection: {
      required: true,
      type: Object
    }
  },
  methods: {
    deleteCollection() {
      this.$store.dispatch(DELETE_COLLECTION, this.collection.id).then(() => {
        this.showDeleteDialog = false;
        this.$router.push({ name: "Dashboard" });
      });
    }
  }
}
</script>

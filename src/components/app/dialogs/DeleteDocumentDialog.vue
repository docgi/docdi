<template>
  <v-dialog
    v-model="show"
    width="500"
    @click:outside="$emit('hide')"
    @keydown.esc="$emit('hide')"
  >
    <v-card>
      <v-card-title>
        Delete <strong class="ml-2">{{ document.name }}</strong>
      </v-card-title>
      <v-card-text>
        This action can't revert.
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="error"
          outlined
          small
          @click="deleteDocument"
          class="text-capitalize"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DELETE_DOCUMENT } from "@/store/mutations.type";

export default {
  name: "DeleteCollectionDialog",
  props: {
    show: {
      required: true,
      type: Boolean
    },
    document: {
      required: true,
      type: Object
    }
  },
  methods: {
    deleteDocument: function () {
      this.$http.delete(`documents/${this.document.id}/`)
        .then(() => {
          this.$emit("hide");
          this.$store.commit(DELETE_DOCUMENT, this.document);
          if (this.$route.name !== "DetailCollection") {
            this.$router.push({
              name: "DetailCollection", params: { id: this.document.collection }
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
};
</script>

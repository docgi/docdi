<template>
  <v-card flat class="px-0">
    <v-card-text class="d-flex justify-center px-0">
      <div v-if="collection.children.length === 0">
        This collection is empty.
      </div>

      <list-document-item
        v-else
        :documents="getDocuments"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ListDocumentItem from "@/components/app/ListDocumentItem";

export default {
  name: "DetailCollectionTab",
  components: {
    ListDocumentItem
  },
  props: {
    collectionId: {
      type: String,
      required: true
    },
    onlyDraft: {
      type: Boolean,
      default: false
    },
    onlyPublished: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getDocuments() {
      return this.$store.getters.groupDocumentsByCollectionAndStatus(
        this.collectionId,
        this.onlyDraft,
        this.onlyPublished
      );
    },
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    }
  }
};
</script>

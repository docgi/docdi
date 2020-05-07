<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title>
        Delete <strong class="ml-2">{{ collection.name }}</strong>
      </v-card-title>
      <v-card-text>
        All docs contain in this collection will be deleted.
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="error" outlined small @click="deleteCollection">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteCollectionDialog",
  props: {
    show: {
      required: true,

    }
  }
}
</script>

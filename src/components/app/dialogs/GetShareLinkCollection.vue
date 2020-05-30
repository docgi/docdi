<template>
  <v-dialog
    width="500"
    v-model="show"
    @click:outside="$emit('hide')"
    @keydown.esc="$emit('hide')"
  >
    <v-card flat>
      <v-card-title>
        Public link of
        <span class="font-weight-bold ml-1">{{ collection.name }}</span>
      </v-card-title>

      <v-card-subtitle>
        Share bellow link to other. Every one has this link can access to
        collection and child documents but can't modify them. Click
        <span class="font-weight-bold ml-1">Un Public</span> button to hide this
        collection.
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-text-field
          outlined
          label="Public Link"
          dense
          v-model="publicLink"
          readonly
        />
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          small
          color="warring"
          class="text-capitalize"
          :disabled="!publicLink"
          @click="unPublic"
          outlined
        >
          Un public
        </v-btn>
        <v-btn
          small
          color="primary"
          class="text-capitalize"
          :disabled="!publicLink"
          @click="copyLinkToClipboard"
          outlined
        >
          Copy link
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MAKE_PUBLIC_COLLECTION, PATCH_COLLECTION } from "@/store/actions.type";

export default {
  name: "GetShareLinkCollection",
  props: {
    collectionId: {
      required: true,
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      publicLink: ""
    };
  },
  created() {
    this.$store
      .dispatch(MAKE_PUBLIC_COLLECTION, this.collectionId)
      .then(response => {
        this.publicLink = response.data.public_link;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    copyLinkToClipboard() {
      navigator.clipboard.writeText(this.publicLink);
      this.$notify({
        group: "noti",
        type: "success",
        title: "Copied"
      });
      this.$emit("hide");
    },
    unPublic() {
      this.$store.dispatch(PATCH_COLLECTION, {
        collectionId: this.collectionId,
        payload: { public: false }
      });
      this.$emit("hide");
    }
  },
  computed: {
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    }
  }
};
</script>

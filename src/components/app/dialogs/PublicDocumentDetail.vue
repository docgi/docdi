<template>
  <v-dialog fullscreen v-model="show" @click:outside="hide" @keydown.esc="hide" transition="dialog-bottom-transition">
    <v-card flat>
      <v-card-title class="px-0">
        <v-btn text color="primary" small @click="$emit('hide')" class="ml-2">
          <v-icon class="fa fa-angle-left mr-2" />
          <span class="text-capitalize mt-1">Back</span>
        </v-btn>
      </v-card-title>
      <div class="mx-2">
        <docgi-editor :editable="false" :content="document.html_content" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import DocgiEditor from "@/components/editor/DocgiEditor";

export default {
  name: "PublicDocumentDetail",
  components: { DocgiEditor },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    document: {
      required: true,
      type: Object
    }
  },
  methods: {
    hide() {
      this.$emit("hide");
    }
  }
};
</script>

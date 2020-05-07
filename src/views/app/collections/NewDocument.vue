<template>
  <div>
    <docgi-editor />
  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";

export default {
  name: "NewDocument",
  components: {
    DocgiEditor,
  },
  data() {
    return {
      keepInBounds: true,
      collectionId: null,
      jsonContent: "",
      htmlContent: "",
    };
  },
  created() {
    this.collectionId = this.$route.params.collectionId;
  },
  methods: {
    saveDocument() {
    }
  },
  computed: {
  },
};
</script>

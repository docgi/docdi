<template>
  <div class="fill-height">
    <docgi-editor></docgi-editor>
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

<style lang="scss">
.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
.app-bar-fixed {
  left: 300px !important;
}
@media (max-width: 960px) {
  .app-bar-fixed {
    left: 50px !important;
  }
}
</style>

<template>
  <div class="fill-height">
    <v-app-bar color="white" fixed flat class="app-bar-fixed">
      <div class="d-flex w-full">
        <v-btn small color="primary" class="text-capitalize ml-auto" @click="saveDocument">Save</v-btn>
      </div>
    </v-app-bar>
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { EditorContent, Editor } from "tiptap";
import Doc from "@/plugins/tiptap/Doc";
import Title from "@/plugins/tiptap/Title";
import {
  Placeholder
} from "tiptap-extensions";

export default {
  name: "NewDocument",
  components: {
    EditorContent,
  },
  data() {
    return {
      keepInBounds: true,
      collectionId: null,
      jsonContent: "",
      htmlContent: "",
      editor: new Editor({
        autoFocus: true,
        content: "",
        onUpdate: ({ getJSON, getHTML }) => {
          this.jsonContent = getJSON();
          this.htmlContent = getHTML();
        },
        extensions: [
          new Doc(),
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Give me a name";
              }
              return "Write something";
            }
          })
        ]
      })
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
  beforeDestroy() {
    this.editor.destroy();
  }
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

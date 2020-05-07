<template>
  <div class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { EditorContent, Editor } from "tiptap";
import Doc from "@/components/app/tiptap/tiptap-core/Doc";
import Title from "@/components/app/tiptap/tiptap-core/Title";
import {
  Placeholder
} from "tiptap-extensions";

export default {
  name: "DocgiEditor",
  components: {
    EditorContent
  },
  data() {
    return {
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
            }
          })
        ]
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

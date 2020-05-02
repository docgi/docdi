<template>
  <div>

  </div>
</template>

<script>
// import { Editor, EditorContent } from 'tiptap';

export default {
  name: "Typing",
  data() {
    return {
      initData: {
        time: 1554508385558,
        blocks: [
          { type: "header", data: { text: "Hello Vue/Editor.js", level: 2 } },
          {
            type: "list",
            data: {
              style: "ordered",
              items: ["Learn Vue.js<br>", "Learn Editor.js"]
            }
          },
          {
            type: "quote",
            data: {
              text: "This is awesome block based editor.<br>",
              caption: "",
              alignment: "left"
            }
          },
          { type: "delimiter", data: {} },
          {
            type: "warning",
            data: {
              title: "Warning",
              message: "Open Development Tools console"
            }
          },
          { type: "delimiter", data: {} }
        ],
        version: "2.12.3"
      }
    };
  },
  watch: {
    editable() {
      this.editor.setOptions({
        editable: this.editable
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
.editor {
  width: 60em;
}
</style>

<template>
  <div>
    <editor-content :editor="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';

export default {
  name: "Typing",
  components: {
    EditorContent
  },
  data() {
    return {
      editable: false,
      editor: new Editor({
        editable: false,
        content: 'Tại sao ổ dịch Hạ Lôi phức tạp hơn nhiều so với Sơn Lôi?'})
    }
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

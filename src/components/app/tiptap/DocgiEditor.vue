<template>
  <div class="editor">
    <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
      <div
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >

        <v-btn
          text
          icon
          @click="commands.heading({ level: 1 })"
        >
          H1
        </v-btn>

          <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <v-icon small class="fa fa-heading"></v-icon>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon small class="fa fa-bold"></v-icon>
        </button>
      </div>
    </editor-floating-menu>

    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { EditorContent, Editor, EditorFloatingMenu } from "tiptap";
import Doc from "./tiptap-core/Doc";
import Title from "./tiptap-core/Title";

import {
  Placeholder,
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  History,
} from "tiptap-extensions";

export default {
  name: "DocgiEditor",
  props: {
    content: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    EditorContent,
    EditorFloatingMenu
  },
  data() {
    return {
      editor: new Editor({
        autoFocus: true,
        content: this.content,
        extensions: [
          new Doc(),
          new Title(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new History(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Give me a name";
              }
            }
          })
        ],
        editable: this.editable,
        onUpdate: ({ getJSON, getHTML }) => {
          this.$emit("onUpdateContent", { json: getJSON(), html: getHTML()})
        }
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

<style lang="scss">
@import "sass/main";

.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>

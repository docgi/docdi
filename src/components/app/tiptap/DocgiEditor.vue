<template>
  <div class="editor">
    <!--  Floating menu  -->
    <editor-floating-menu
      v-if="editable"
      :editor="editor"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top - 6}px`"
      >
        <v-btn
          icon
          small
          class="editor-bar-button header_text"
          @click="commands.heading({ level: 2 })"
        >
          <span style="font-size: 1rem;">H2</span>
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button header_text"
          @click="commands.heading({ level: 3 })"
        >
          <span style="font-size: 1rem;">H3</span>
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon small class="fa fa-quote-right" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          @click="commands.horizontal_rule"
        >
          <v-icon small class="fa fa-window-minimize" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon small class="fa fa-list-ul" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon small class="fa fa-list-ol" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <v-icon small class="fa fa-code" />
        </v-btn>
      </div>
    </editor-floating-menu>

    <!--  Bubble menu  -->
    <editor-menu-bubble
      v-if="editable"
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon small class="fa fa-bold" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon small class="fa fa-italic" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon small class="fa fa-strikethrough" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon small class="fa fa-underline" />
        </v-btn>

        <v-btn
          icon
          small
          class="editor-bar-button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <v-icon small class="fa fa-code" />
        </v-btn>
      </div>
    </editor-menu-bubble>

    <!--  Editor  -->
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import {
  EditorContent,
  Editor,
  EditorFloatingMenu,
  EditorMenuBubble
} from "tiptap";
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
  Strike,
  Underline,
  Image,
  HorizontalRule,
} from "tiptap-extensions";

export default {
  name: "DocgiEditor",
  props: {
    content: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EditorContent,
    EditorFloatingMenu,
    EditorMenuBubble
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        autoFocus: true,
        content: this.content,
        extensions: [
          new Doc(),
          new Title(),
          new Underline(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem({ nested: true }),
          new TodoList(),
          new Link(),
          new Bold(),
          new Strike(),
          new Code(),
          new Italic(),
          new History(),
          new Image(),
          new HorizontalRule(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Give me a name ...";
              }
            }
          })
        ],
        editable: this.editable,
        onUpdate: ({ getJSON, getHTML }) => {
          this.$emit("onChangeContent", { json: getJSON(), html: getHTML() });
        }
      })
    };
  },
  watch: {
    editable() {
      this.editor.setOptions({
        editable: this.editable
      });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

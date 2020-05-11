<template>
  <div class="editor">
    <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu}">
      <div
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top - 6}px`"
      >

        <v-btn
          icon
          small
          class="editor-bar-button header_text"
          @click="commands.heading({ level: 1 })"
        >
          <span style="font-size: 1rem;">H1</span>
        </v-btn>

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
          new TodoItem({nested: true}),
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

.editor h1:nth-child(1) {
  margin-bottom: 2rem;
}

.editor {
  position: relative;
  &__floating-menu {
    position: absolute;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}

.editor-bar-button {
  font-weight: bold;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: $color-black;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: rgba($color-black, 0.05);
  }

  &.is-active {
    background-color: rgba($color-black, 0.1);
  }
}

.header_text {
  padding-top: 8px;
}
ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: flex;
  flex-direction: row;
}
.todo-checkbox {
  border: 2px solid $color-black;
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  transition: 0.4s background;
}

.todo-content {
  flex: 1;
  > p:last-of-type {
    margin-bottom: 0;
  }
  > ul[data-type="todo_list"] {
    margin: .5rem 0;
  }
}
li[data-done="true"] {
  > .todo-content {
    > p {
      text-decoration: line-through;
    }
  }
  > .todo-checkbox {
    background-color: $color-black;
  }
}
li[data-done="false"] {
  text-decoration: none;
}
</style>

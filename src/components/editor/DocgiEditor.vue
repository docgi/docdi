<template>
  <div class="editor">
    <!--  Floating menu  -->
    <editor-menu-bar
      v-show="editable"
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div
        :class="{ 'is-active': isActive }"
      >
        <menu-button
          @click="commands.heading({ level: 2 })"
          tooltip-text="Heading"
          fa-class="fas fa-heading"
        />

        <menu-button
          @click="commands.heading({ level: 3 })"
          tooltip-text="Small heading"
          fa-class="fas fa-heading"
          x-small
        />

        <menu-button
          @click="commands.bold"
          fa-class="fa-bold"
          tooltip-text="Bold"
        />

        <menu-button
          @click="commands.underline"
          fa-class="fa-underline"
          tooltip-text="Underline"
        />

        <menu-button
          @click="commands.italic"
          fa-class="fa-italic"
          tooltip-text="Italic"
        />

        <menu-button
          @click="commands.blockquote"
          fa-class="fa-quote-right"
          tooltip-text="Quote"
        />

        <menu-button
          @click="commands.horizontal_rule"
          tooltip-text="Split"
          fa-class="fa-window-minimize"
        />

        <menu-button
          @click="commands.bullet_list"
          tooltip-text="Bullet List"
          fa-class="fa-list-ul"
        />

        <menu-button
          @click="commands.ordered_list"
          tooltip-text="Ordered List"
          fa-class="fa-list-ol"
        />

        <menu-button
          @click="commands.code_block"
          tooltip-text="Code block"
          fa-class="fa-code"
        />

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <label
              for="file-upload"
              class="label"
              v-on="on"
              style="padding-left: 5px"
            >
              <v-icon small class="fa fa-image" />
            </label>
          </template>
          <span>Image</span>
        </v-tooltip>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          @change="onSelectImage($event, commands)"
        />
      </div>
    </editor-menu-bar>

    <!--  Bubble menu  -->
    <editor-menu-bubble
      v-if="editable"
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu, getMarkAttrs }"
      @hide="hideLinkMenu"
    >
      <div
        class="bubble-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <menu-button
          :is-active="isActive.bold()"
          @click="commands.bold"
          fa-class="fa-bold"
          tooltip-text="Bold"
          v-if="!linkMenuIsActive"
        />

        <menu-button
          :is-active="isActive.italic()"
          @click="commands.italic"
          fa-class="fa-italic"
          tooltip-text="Italic"
          v-if="!linkMenuIsActive"
        />

        <menu-button
          :is-active="isActive.strike()"
          @click="commands.strike"
          fa-class="fa-strikethrough"
          tooltip-text="Strike"
          v-if="!linkMenuIsActive"
        />

        <menu-button
          :is-active="isActive.underline()"
          @click="commands.underline"
          fa-class="fa-underline"
          tooltip-text="Underline"
          v-if="!linkMenuIsActive"
        />

        <menu-button
          :is-active="isActive.code()"
          @click="commands.code"
          fa-class="fa-code"
          tooltip-text="Inline code"
          v-if="!linkMenuIsActive"
        />

        <form
          class="bubble-menu-form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="bubble-menu-link-input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
        </form>
        <template v-else>
          <menu-button
            @click="showLinkMenu(getMarkAttrs('link'))"
            fa-class="fa-link"
            :is-active="isActive.link()"
            :tooltip-text="isActive.link() ? 'Update Link' : 'Add Link'"
          >
          </menu-button>
        </template>
      </div>
    </editor-menu-bubble>

    <!--  Editor  -->
    <editor-content class="content" :editor="editor" />
  </div>
</template>

<script>
import axios from "axios";
import { EditorContent, Editor, EditorMenuBubble, EditorMenuBar } from "tiptap";
import Doc from "./editor-core/Doc";
import Title from "./editor-core/Title";
import MenuButton from "@/components/editor/editor-core/MenuButton";
// import EditorFloatingMenu from "@/components/editor/editor-core/EditorFloatingMenu";

import {
  CodeBlockHighlight,
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
  HorizontalRule
} from "tiptap-extensions";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";

import Image from "./editor-core/Image";

async function uploadFunc(file) {
  let formData = new FormData();
  formData.append("image", file);
  const headers = { "Content-Type": "multipart/form-data" };
  const response = await axios.post("/document-images/", formData, {
    headers: headers
  });
  return response.data.src;
}

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
    EditorMenuBubble,
    MenuButton,
    EditorMenuBar,
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        autoFocus: true,
        content: this.content,
        extensions: [
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
              python
            }
          }),
          new Doc(),
          new Title(),
          new Underline(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
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
          new Image(null, null, uploadFunc),
          new HorizontalRule(),
          new Placeholder({
            showOnlyCurrent: true,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Untitled";
              }
              // return "Type / for show commands ...";
            }
          })
        ],
        editable: this.editable,
        onUpdate: ({ getJSON, getHTML }) => {
          let json = getJSON();
          let html = getHTML();
          let name = "";
          if (
            json &&
            json.content[0].type === "title" &&
            json.content[0].content &&
            json.content[0].content.length > 0 &&
            Object.hasOwnProperty.call(
              json.content[0].content[0],
              "text"))
          {
              name = json.content[0].content[0].text;
          }
          this.$emit("onChangeName", name);
          this.$emit("onChangeContent", { json: json, html: html});
        }
      }),
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    cl(val) {console.log(val);},
    async onSelectImage(event, commands) {
      try {
        let res = await uploadFunc(event.target.files[0]);
        commands.image({
          src: res
        });
      } catch (error) {
        // Todo
        console.log(error);
      }
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    forceSetContent(content) {
      this.editor.setContent(content);
    }
  },
  computed: {
    title() {
      return "";
    }
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

<style scoped lang="scss">
$color-black: #000000;

input[id="file-upload"] {
  display: none;
}
.label {
  display: inline-block;
  cursor: pointer;
  height: 28px;
  width: 28px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: rgba($color-black, 0.05);
  }
}
</style>

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
        :style="`top: ${menu.top - 8}px`"
      >
        <menu-button
          @click="cl(getNodeAttrs)"
          tooltip-text="Heading 1"
        >
          Cl
        </menu-button>

        <menu-button
          @click="commands.heading({ level: 1 })"
          tooltip-text="Heading 1"
        >
          H1
        </menu-button>

        <menu-button
          @click="commands.heading({ level: 2 })"
          tooltip-text="Heading 2"
        >
          H2
        </menu-button>

        <menu-button
          @click="commands.heading({ level: 3 })"
          tooltip-text="Heading 3"
        >
          H3
        </menu-button>

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
    </editor-floating-menu>

    <!--  Bubble menu  -->
    <editor-menu-bubble
      v-if="editable"
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu, getMarkAttrs }"
      @hide="hideLinkMenu"
    >
      <div
        class="menububble"
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
          class="menububble__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="menububble__input"
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
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import axios from "axios";
import {
  EditorContent,
  Editor,
  EditorMenuBubble
} from "tiptap";
import Doc from "./tiptap-core/Doc";
import Title from "./tiptap-core/Title";
import Figure from "@/components/app/tiptap/tiptap-core/Figure";
import MenuButton from "@/components/app/tiptap/tiptap-core/MenuButton";
import EditorFloatingMenu from "@/components/app/tiptap/tiptap-core/EditorFloatingMenu";

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
  HorizontalRule
} from "tiptap-extensions";
import Image from "./tiptap-core/Image";

async function upload(file) {
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
    EditorFloatingMenu,
    EditorMenuBubble,
    MenuButton
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
          new Image(null, null, upload),
          new Figure(),
          new HorizontalRule(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === "title") {
                return "Untitled";
              }
              return "Start typing...";
            }
          })
        ],
        editable: this.editable,
        onUpdate: ({ getJSON, getHTML }) => {
          this.$emit("onChangeContent", { json: getJSON(), html: getHTML() });
        }
      }),
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    cl(o) {
      console.log(o);
    },
    async onSelectImage(event, commands) {
      try {
        let res = await upload(event.target.files[0]);
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

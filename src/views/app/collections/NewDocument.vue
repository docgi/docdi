<template>
  <div>
    <v-app-bar fixed flat color="white" class="app-bar-fixed">
      <div class="ml-auto">
        <v-btn
          small
          outlined
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc"
        >
          Save
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn small icon v-on="on">
              <v-icon small class="fa fa-ellipsis-h"></v-icon>
            </v-btn>
          </template>
        </v-menu>
      </div>
    </v-app-bar>

    <docgi-editor @onChangeContent="onChangeContent" />
  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";
import { CREATE_NEW_DOCUMENT } from "@/store/actions.type";

export default {
  name: "NewDocument",
  components: {
    DocgiEditor
  },
  data() {
    return {
      collectionId: null,
      jsonContent: null,
      htmlContent: ""
    };
  },
  created() {
    this.collectionId = this.$route.params.collectionId;
  },
  methods: {
    onChangeContent({ json, html }) {
      this.jsonContent = json;
      this.htmlContent = html;
    },
    createDoc() {
      let payload = {
        name: this.docName,
        collection: this.collectionId,
        json_content: this.jsonContent,
        html_content: this.htmlContent
      };
      this.$store
        .dispatch(CREATE_NEW_DOCUMENT, payload)
        .then(response => {
          let documentId = response.data.id;
          this.$router.push({
            name: "DetailDocument",
            params: { id: documentId }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    docName() {
      if (this.jsonContent) {
        return this.jsonContent.content[0].content[0].text;
      }
      return "";
    }
  }
};
</script>

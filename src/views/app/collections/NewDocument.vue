<template>
  <div>
    <v-app-bar fixed flat color="white" class="app-bar-fixed">
      <div class="ml-auto">
        <v-btn
          small
          outlined
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({draft: true})"
        >
          Save as draft
        </v-btn>
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="createDoc({draft: false})"
        >
          Save
        </v-btn>
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
    createDoc(extraParams) {
      let payload = {
        name: this.docName,
        collection: this.collectionId,
        json_content: this.jsonContent,
        html_content: this.htmlContent,
        draft: extraParams.draft || false
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

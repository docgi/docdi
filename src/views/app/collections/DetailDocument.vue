<template>
  <div v-if="document">
    <v-app-bar fixed flat color="white" class="app-bar-fixed">
      <div class="ml-auto">
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="editable = true"
          v-if="!editable"
        >
          Edit
        </v-btn>
        <v-btn
          small
          color="primary"
          class="mr-2 text-capitalize"
          @click="saveEditDoc"
          outlined
          v-else
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
    <docgi-editor
      :content="document.html_content"
      :editable="editable"
      :key="document.id"
      @onChangeContent="onChangeContent"
    />
  </div>
</template>

<script>
import DocgiEditor from "@/components/app/tiptap/DocgiEditor";
export default {
  name: "DetailDocument",
  components: { DocgiEditor },
  data() {
    return {
      document: null,
      jsonContent: null,
      htmlContent: "",
      editable: false,
    }
  },
  async created() {
    try {
      let response = await this.$http.get(`documents/${this.$route.params.id}/`);
      this.document = response.data;
    } catch (e) {
      console.log(e); // Todo
    }
  },
  methods: {
    saveEditDoc() {
      this.editable = false;
      if (!this.name && !this.jsonContent && !this.htmlContent) {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Nothing update."
        });
        return;
      }
      let payload = {
        name: this.docName,
        json_content: this.jsonContent,
        html_content: this.htmlContent
      };
      this.$http.put(`documents/${this.document.id}/`, payload)
        .then(() => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Update successful."
          });
          this.docName = "";
          this.jsonContent = "";
          this.htmlContent = "";
        })
        .catch((error) => {
          console.log(error);
        })
    },
    onChangeContent({ json, html }) {
      this.jsonContent = json;
      this.htmlContent = html;
    },
  },
  computed: {
    docName() {
      if (this.jsonContent) {
        return this.jsonContent.content[0].content[0].text;
      }
      return "";
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      let response = await this.$http.get(`documents/${to.params.id}/`);
      this.document = response.data;
    } catch (e) {
      console.log(e); // Todo
    }
    next();
  }
}
</script>

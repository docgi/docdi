<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="enableDrawer"
    />
    <div class="ml-auto">
      <v-btn
        color="primary"
        small
        class="text-capitalize"
        @click="newDocument"
        v-show="showNewDocButton"
      >
        <template v-slot:default>
          <v-icon small class="fa fa-plus mr-2" />
          <span style="padding-top: 2px">
            New document
          </span>
        </template>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DIALOG, SET_DRAWER } from "@/store/mutations.type";
import { CREATE_NEW_DOCUMENT } from "@/store/actions.type";

const UUID_REGEX =
  "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}";

export default {
  name: "TheAppBar",
  data() {
    return {
      showSelectCollection: false
    };
  },
  methods: {
    enableDrawer() {
      this.$store.commit(SET_DRAWER, true);
    },
    newDocument() {
      let reg = RegExp(`/collections/${UUID_REGEX}`);
      if (reg.test(this.currentPath)) {
        let matches = this.currentPath.match(UUID_REGEX);
        if (matches.length > 0) {
          let collectionId = matches[0];

          let payload = {
            collection: collectionId,
            draft: true
          };
          this.$store
            .dispatch(CREATE_NEW_DOCUMENT, payload)
            .then(response => {
              this.$router.push({
                name: "DetailDocument",
                params: { id: response.data.id },
                query: {new: true}
              });
            })
            .catch(() => {
              this.$notify({
                group: "noti",
                type: "error",
                title: "Something wrong, please try again."
              });
            });
        }
      } else {
        this.$store.commit(SET_DIALOG, { newDocument: true });
      }
    }
  },
  computed: {
    ...mapGetters({
      currentPath: "getCurrentPath"
    }),
    showNewDocButton() {
      let hideOnRoutes = ["/documents/*", "/settings"];
      for (const item of hideOnRoutes) {
        let regex = RegExp(item);
        if (regex.test(this.currentPath)) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

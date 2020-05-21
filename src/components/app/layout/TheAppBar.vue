<template>
  <v-app-bar app flat color="white" hide-on-scroll>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      style="margin-left: -17px"
      @click="enableDrawer"
    />
    <div class="ml-auto">
      <v-btn color="primary" small class="text-capitalize" @click="newDocument">
        <template v-slot:default>
          <v-icon small class="fa fa-plus mr-2" />
          <span style="padding-top: 2px">
            New document
          </span>
        </template>
      </v-btn>
    </div>

    <v-dialog width="500" v-model="showSelectCollection">
      <v-card>
        <v-card-title>
          Select collection
        </v-card-title>
        <v-card-text>
          <v-select
            dense
            outlined
            label="Collection"
            item-text="name"
            :items="collections"
            v-model="selectedCollection"
            :return-object="true"
          >
            <template v-slot:item="{ item }">
              <div class="d-flex justify-center flex-row">
                <v-icon size="20" :color="item.color" class="fa fa-folder" />
                <span class="ml-2" style="margin-top: 3px;">{{
                  item.name
                }}</span>
              </div>
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="text-capitalize"
            color="primary"
            small
            :disabled="!selectedCollection"
            @click="goToNewDocument"
          >
            New
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_DRAWER } from "@/store/mutations.type";

export default {
  name: "TheAppBar",
  data() {
    return {
      showSelectCollection: false,
      selectedCollection: null
    };
  },
  methods: {
    enableDrawer() {
      this.$store.commit(SET_DRAWER, true);
    },
    showNewDocButton() {
      let hideOnRoutes = ["/collections/*", "/documents/*"];
      for (const item of hideOnRoutes) {
        let regex = RegExp(item);
        if (regex.test(this.currentPath)) {
          return false;
        }
      }
      return true;
    },
    newDocument() {
      if (this.currentPath.startsWith("/collections/")) {
        this.$router.push({
          path: `${this.currentPath}/new`
        });
      } else {
        this.showSelectCollection = true;
      }
    },
    goToNewDocument() {
      this.showSelectCollection = false;
      this.$router.push({ name: "NewDocument", params: { collectionId: this.selectedCollection.id } });
    }
  },
  computed: {
    ...mapGetters({
      currentPath: "getCurrentPath",
      collections: "getCollectionsForSelect"
    })
  }
};
</script>

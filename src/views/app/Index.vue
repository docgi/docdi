<template>
  <div class="d-flex fill-height">
    <the-nav-bar />
    <the-app-bar />
    <v-content>
      <v-container fluid class="d-flex justify-center">
        <div class="col-12 col-md-10 col-lg-8 pa-0">
          <router-view />
          <new-collection-dialog />
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import TheNavBar from "@/components/app/TheNavBar";
import TheAppBar from "@/components/app/TheAppBar";
import NewCollectionDialog from "@/components/app/NewCollectionDialog";

export default {
  name: "AppIndex",
  metaInfo: {
    title: 'Docdi',
    titleTemplate: 'Docdi - %s'
  },
  components: {
    TheNavBar,
    TheAppBar,
    NewCollectionDialog,
  },
};
</script>

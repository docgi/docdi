<template>
  <div class="d-flex fill-height">
    <the-nav-bar />
    <the-app-bar />
    <v-main>
      <v-container fluid class="d-flex justify-center">
        <div class="col-12 col-md-10 col-lg-8 pa-0">
          <router-view />
        </div>
      </v-container>
    </v-main>

    <new-collection-dialog />
    <choose-collection />
    <send-invitation />
    <notifications position="bottom right" group="noti" />
  </div>
</template>

<script>
import TheNavBar from "@/components/app/layout/TheNavBar";
import TheAppBar from "@/components/app/layout/TheAppBar";
import NewCollectionDialog from "@/components/app/dialogs/NewCollectionDialog";
import ChooseCollection from "@/components/app/dialogs/ChooseCollection";
import SendInvitation from "@/components/app/dialogs/SendInvitations";

export default {
  name: "AppIndex",
  metaInfo: {
    title: 'Docdi',
    titleTemplate: 'Docdi - %s'
  },
  components: {
    SendInvitation,
    TheNavBar,
    TheAppBar,
    NewCollectionDialog,
    ChooseCollection,
  },
};
</script>

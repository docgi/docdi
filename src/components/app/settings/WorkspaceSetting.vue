<template>
  <div>
    <div class="d-flex mt-6">
      <div class="d-flex flex-column">
        <div class="font-weight-bold">Workspace logo</div>
        <div class="logo-wrapper">
          <v-avatar tile size="100" color="teal" style="border-radius: 7px;">
            <img class="img-logo" v-if="workspace.logo" :src="logoPath"/>
            <span class="img-logo" v-else>No logo</span>
            <v-file-input
              class="upload-button"
              prepend-icon=""
              append-outer-icon=""
              placeholder="Upload"
              @change="selectLogo"
            />
          </v-avatar>
        </div>

        <div class="d-flex mt-6">
          <v-btn color="primary" small @click="update">Save</v-btn>
        </div>
      </div>
    </div>

    <v-divider class="mt-6" />
    <div class="d-flex mt-6">
      <v-btn text :to="{ name: 'SendInvitations' }" color="primary">
        Send invitations
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WorkspaceSetting",
  data() {
    return {
      selectedLogo: "",
    }
  },
  computed: {
    ...mapGetters({ workspace: "currentWorkspace" }),
    logoPath() {
      if (this.selectedLogo) {
        return URL.createObjectURL(this.selectedLogo);
      }
      return this.workspace.logo;
    }
  },
  methods: {
    selectLogo(file) {
      this.selectedLogo = file;
    },
    update() {
      this.$store.dispatch("updateWorkspace", {logo: this.selectedLogo});
      this.selectedLogo = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-wrapper {
  .upload-button {
    transition: .5s ease;
    opacity: 0;
    top: 50%;
    left: 65%;
    position: absolute;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;

    ::v-deep .v-file-input__text--placeholder {
      color: white;
    }
    ::v-deep .v-text-field__slot {
      text-align: center;
    }
    ::v-deep .v-input__slot {
      cursor: pointer;
      &:before {
        border: none;
      }
      &:after {
        border: none;
      }
    }
  }

  &:hover {
    .img-logo {
      opacity: 0.2;
    }
    .upload-button {
      opacity: 1;
    }
  }
}
</style>

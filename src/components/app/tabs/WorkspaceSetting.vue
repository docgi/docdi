<template>
  <div class="d-flex mt-6">
    <div class="d-flex flex-column">
      <div class="font-weight-bold">Workspace logo</div>
      <div class="img-wrapper">
        <v-avatar tile size="100" color="teal" style="border-radius: 7px;">
          <img class="img-logo" v-if="workspace.logo" :src="logoPath" />
          <span class="img-logo" v-else>No logo</span>
          <v-file-input
            class="upload-button"
            prepend-icon=""
            append-outer-icon=""
            placeholder="Upload"
            accept="image/*"
            @change="selectLogo"
          />
        </v-avatar>
      </div>

      <div class="d-flex mt-6">
        <v-btn color="primary" small @click="update">Save</v-btn>
      </div>

    </div>
  </div>
</template>

<script>
import { UPDATE_WORKSPACE } from "@/store/actions.type";

export default {
  name: "WorkspaceSetting",
  data() {
    return {
      workspace: {
        name: "",
        logo: ""
      }
    };
  },
  created() {
    this.workspace = {...this.$store.state.base.workspace};
  },
  computed: {
    logoPath() {
      if (typeof this.workspace.logo !== "string") {
        return URL.createObjectURL(this.workspace.logo);
      }
      return this.workspace.logo;
    }
  },
  methods: {
    selectLogo(file) {
      this.workspace.logo = file;
    },
    async update() {
      try {
        await this.$store.dispatch(UPDATE_WORKSPACE, this.workspace);
      } catch (e) {
        console.log(e);
      } finally {
        this.workspace = {...this.$store.state.base.workspace};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  .upload-button {
    transition: 0.5s ease;
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

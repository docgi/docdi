<template>
  <div>
    <div class="d-flex mt-6">
      <div class="d-flex flex-column">
        <div class="font-weight-bold">Avatar</div>
        <div class="img-wrapper">
          <v-avatar tile size="100" color="teal" style="border-radius: 7px;">
            <img class="img-logo" v-if="user.avatar" :src="avatarPath" />
            <span class="img-logo" v-else>No avatar</span>
            <v-file-input
              class="upload-button"
              prepend-icon=""
              append-outer-icon=""
              placeholder="Upload"
              @change="selectImage"
            />
          </v-avatar>
        </div>

        <div class="mt-6">
          <div class="font-weight-bold">Username</div>

          <v-text-field outlined dense v-model="username" :value="user.username"></v-text-field>
        </div>
        <div class="d-flex">
          <v-btn color="primary" small @click="update">Save</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { UPDATE_USER } from "@/store/actions.type";

export default {
  name: "UserSetting",
  data() {
    return {
      selectedImage: "",
      username: ""
    };
  },
  methods: {
    ...mapActions([UPDATE_USER]),
    selectImage(file) {
      this.selectedImage = file;
    },
    update() {
      try {
        let payload = {
          avatar: this.selectedImage,
          username: this.user.username
        };
        this.updateUser(payload);
      } catch (e) {
        console.log(e);
      } finally {
        this.selectedImage = "";
      }
    }
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
    avatarPath() {
      if (this.selectedImage) {
        return URL.createObjectURL(this.selectedImage);
      }
      return this.user.avatar;
    }
  }
};
</script>

<style scoped lang="scss">
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

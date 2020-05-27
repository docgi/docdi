<template>
  <div class="d-flex mt-6">
    <div class="d-flex flex-column">
      <div class="font-weight-bold">Workspace logo</div>
      <v-hover v-slot:default="{ hover }">
        <v-avatar
          tile
          size="100"
          style="border-radius: 7px;"
          class="d-flex flex-column"
        >
          <v-img :src="getSrcLogo">
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out align-center fill-height justify-center w-full"
              >
                <label for="file-upload" class="label">
                  Change
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="selectLogo($event)"
                />
              </div>
            </v-expand-transition>
          </v-img>
        </v-avatar>
      </v-hover>

      <div class="d-flex mt-6">
        <v-btn
          class="text-capitalize"
          color="primary"
          small
          @click="update"
          :disabled="!selectedLogo"
        >
          Update
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_WORKSPACE } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "WorkspaceSetting",
  data() {
    return {
      selectedLogo: null
    };
  },
  computed: {
    getSrcLogo() {
      if (this.selectedLogo) {
        return URL.createObjectURL(this.selectedLogo);
      }
      return this.workspace.logo ? this.workspace.logo : "";
    },
    ...mapGetters({ workspace: "currentWorkspace" })
  },
  methods: {
    selectLogo(event) {
      if (event.target.files.length > 0) {
        this.selectedLogo = event.target.files[0];
      }
    },
    async update() {
      try {
        if (this.selectedLogo) {
          let payload = {
            logo: this.selectedLogo
          };
          await this.$store.dispatch(UPDATE_WORKSPACE, payload);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.selectedLogo = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input[id="file-upload"] {
  display: none;
}
.label {
  display: inline-block;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  background-color: white;
  border-radius: 3px;
}
</style>

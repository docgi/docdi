<template>
  <div class="d-flex mt-6 flex-column">
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

    <v-divider class="my-4" />

    <v-card flat>
      <v-card-title>Members</v-card-title>
      <v-card-subtitle>
        <v-btn
          small
          class="text-capitalize pa-0"
          color="primary"
          text
          :to="{ name: 'SendInvitations' }"
        >
          <v-icon class="mr-2 fa fa-plus" small />
          Invite more
        </v-btn>
      </v-card-subtitle>

      <v-card-text class="pa-0">
        <v-list>
          <v-list-item
            v-for="(member, key) of members"
            :key="key"
            class="d-flex"
          >
            <div class="w-full fill-height">
              <div class="d-flex align-center">
                <user-display :user="member.user" :size="35">
                  <template v-slot:default>
                    {{ member.user.email }}
                  </template>
                </user-display>

                <div class="ml-4">
                  <span class="d-block font-weight-bold">
                    {{ member.user.username }}
                  </span>
                  {{ getTextForRole(member.role) }}
                </div>

                <v-menu class="ml-auto d-inline-block">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon v-on="on">
                      <v-icon small class="fa fa-ellipsis-h" />
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item class="pa-0" dense>
                      <v-btn text x-small class="text-capitalize w-full">
                        Stats
                      </v-btn>
                    </v-list-item>
                    <v-list-item class="pa-0 w-full" dense >
                      <v-btn text x-small color="red lighten-2" class="w-full text-capitalize">
                        Delete member
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <v-divider class="mt-2" />
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { UPDATE_WORKSPACE } from "@/store/actions.type";
import { mapGetters } from "vuex";
import UserDisplay from "@/components/app/UserDisplay";
import { WORKSPACE_MEMBER_ROLES } from "@/common/constants";

export default {
  name: "WorkspaceSetting",
  components: { UserDisplay },
  created() {
    this.$http
      .get("workspace/members/")
      .then(res => {
        this.members = res.data;
      })
      .catch(error => {
        this.$notify({
          group: "foo",
          type: "error",
          title: error.response.data // Todo
        });
      });
  },
  data() {
    return {
      selectedLogo: null,
      members: [],
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
    getTextForRole(roleNumber) {
      for (const role of WORKSPACE_MEMBER_ROLES) {
        console.log(role);
        if (role.value === roleNumber) {
          return role.text;
        }
      }
      return "Member";
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
        console.log(e); // Todo
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

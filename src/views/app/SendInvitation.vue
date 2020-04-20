<template>
  <div class="d-flex justify-center">
    <v-dialog
      value="true"
      max-width="600px"
      @click:outside="$router.back()"
      @keydown="routerBackOnEsc"
    >
      <v-card>
        <v-card-title class="ml-2">
          <!--    Default   -->
          <span v-if="!sent">Invite members</span>

          <!--    Sent      -->
          <span v-else>Recently invited</span>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-alert v-if="errorMessage" type="warning" class="mx-2">
            {{ errorMessage }}
          </v-alert>

          <!--    Default   -->
          <v-container v-if="!sent">
            <v-row class="mt-0">
              <v-col cols="7">Email</v-col>
              <v-col cols="4">Role</v-col>
            </v-row>

            <v-row v-for="(item, index) in invitations" :key="index">
              <v-col cols="7" class="py-0">
                <v-text-field
                  v-model="item.email"
                  :rules="emailRules"
                  outlined
                  dense
                  placeholder="email@example.com"
                >
                </v-text-field>
              </v-col>

              <v-col cols="4" class="py-0">
                <v-select
                  dense
                  outlined
                  v-model="item.workspace_role"
                  :items="memberRoleChoices"
                ></v-select>
              </v-col>

              <v-col cols="1">
                <v-btn
                  v-if="invitations.length > 1"
                  icon
                  style="margin-top: -10px"
                  @click="removeInvite(index)"
                >
                  <v-icon>fa-times</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0 my-0">
                <v-btn
                  text
                  color="green"
                  small
                  class="font-weight-bold pa-0"
                  @click="addMore"
                >
                  + Add more
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <!--    Sent   -->
          <v-container v-else>
            <div v-if="this.recentlyInvited.length === 0">
                <v-alert type="warning">
                  No invitation send
                </v-alert>
            </div>

            <div v-else>
              <v-row class="mt-0">
                <v-col cols="8">Email</v-col>
                <v-col cols="4">Role</v-col>
              </v-row>
              <v-divider />
              <v-row v-for="(item, index) in this.recentlyInvited" :key="index">
                <v-col cols="8" class="text-lowercase font-weight-bold">
                  {{ item.email }}
                </v-col>
                <v-col cols="4" class="text-capitalize font-weight-bold">
                  {{ item.workspace_role === adminRole ? "Admin" : "Member" }}
                </v-col>
              </v-row>
            </div>
          </v-container>

        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="primary"
            class="text-capitalize font-weight-bold"
            outlined
            v-if="!recentlyInvited"
            :loading="loading"
            :disabled="!isValidInvitations"
            @click="sendInvitations"
          >
            Sent invitations
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { isValidEmail } from "@/common/utils";
import { backOnEsc } from "@/plugins/mixins";
import {
  MEMBER_ROLE,
  ADMIN_ROLE,
  WORKSPACE_MEMBER_ROLES
} from "@/common/constants";

export default {
  name: "SendInvitation",
  metaInfo: {
    title: "Dashboard"
  },
  mixins: [backOnEsc],
  data() {
    return {
      memberRoleChoices: WORKSPACE_MEMBER_ROLES,
      memberRole: MEMBER_ROLE,
      adminRole: ADMIN_ROLE,
      invitations: [
        {
          email: "",
          workspace_role: MEMBER_ROLE
        }
      ],
      emailRules: [v => isValidEmail(v) || "Invalid email."],
      loading: false,
      sent: false,
      recentlyInvited: null,
      errorMessage: ""
    };
  },
  methods: {
    removeInvite(index) {
      this.invitations.splice(index, 1);
    },
    addMore() {
      this.invitations.push({
        email: "",
        workspace_role: MEMBER_ROLE
      });
    },
    async sendInvitations() {
      this.errorMessage = "";
      let payload = {
        invitations: this.invitations
      };
      try {
        this.loading = true;
        let result = await this.$http.post("invitations/sends/", payload);
        this.sent = true;
        this.recentlyInvited = result.data.recently_invited || [];
      } catch (e) {
        if (e.response.data.invitations.invitations) {
          console.log(e.response.data);
          this.errorMessage = e.response.data.invitations.invitations;
        }
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    isValidInvitations() {
      for (let i in this.invitations) {
        if (!isValidEmail(this.invitations[i].email)) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

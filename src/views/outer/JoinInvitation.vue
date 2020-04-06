<template>
  <div class="justify-center d-flex align-center w-full" style="height: 90%;">
    <spin v-if="loading" :loading="true" />
    <div v-else>
      <div v-if="isError">
        <v-alert type="warning">
          {{ error }}
        </v-alert>
      </div>
      <v-dialog
        v-else
        v-model="dialog"
        persistent
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Join <span style="font-weight: bold">{{ workspace }}</span> on Docdi.
          </v-card-title>
          <v-card-text>
            Ya, so cool, member of <span style="font-weight: bold">{{ workspace }}</span> has invited you join Docdi.
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              outlined
              @click="agreeJoin"
            >
              Join
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Spin from "vue-spinner/src/PulseLoader";
import { setToken } from "@/common/token.service";
import { buildFullSubDomain } from "@/common/utils";

export default {
  name: "JoinInvitation",
  metaInfo: {
    title: "Join invitation"
  },
  components: {
    Spin
  },
  data() {
    return {
      workspace: "",
      uuid: "",
      error: "",
      isError: false,
      loading: true,
      dialog: true
    };
  },
  async created() {
    this.workspace = this.$route.params.workspace;
    this.uuid = this.$route.params.uuid;
    let payload = {
      workspace: this.workspace,
      uuid: this.uuid
    };
    try {
      await this.$http.post("invitations/check/", payload);
    } catch (e) {
      this.isError = true;
      this.error = "Invitations not found";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async agreeJoin() {
      this.error = "";
      let payload = {
        workspace: this.workspace,
        uuid: this.uuid
      };
      try {
        let res = await this.$http.post("invitations/check/", payload);
        let token = res.data.token;
        let needPass = res.data.need_pass;

        if (needPass) {
          setToken(token);
          await this.$router.push({"name": "SetPassword"});
        } else {
          location.href = buildFullSubDomain(this.workspace);
        }

      } catch (e) {
        this.error = "Invitations expired";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

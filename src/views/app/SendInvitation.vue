<template>
  <div class="d-flex justify-center">
    <v-dialog
      value="true"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Inivte members</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="mt-0">
              <v-col cols="7">Email</v-col>
              <v-col cols="4">Role</v-col>
            </v-row>
            <v-row v-for="(item, index) in invitations" :key="index">
              <v-col cols="7" class="py-0">
                <v-text-field
                  v-model="item.email"
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
                  v-model="item.role"
                  :items="[{text: 'Member', value: 1},{text: 'Admin', value: 2}]"
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
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Invitation",
  data() {
    return {
      invitations: [
        {
          email: "",
          role: 1
        },
        {
          email: "",
          role: 1
        }
      ]
    }
  },
  methods: {
    removeInvite(index) {
      this.invitations.slice(index, 1);
    }
  }
}
</script>

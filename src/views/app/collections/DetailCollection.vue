<template>
  <div v-if="collection">
    <div class="d-flex align-center">
      <v-icon x-large>
        {{ "fa-folder-open" }}
      </v-icon>

      <span class="ml-4 header" style="padding-top: 7px;">
        {{ collection.name }}
      </span>

      <v-btn
        small
        color="primary"
        class="ml-auto text-capitalize"
        :to="{ name: 'NewDocument', params: { collectionId: collection.id } }"
      >
        <template v-slot:default>
          <v-icon small class="fa fa-plus mr-2" />
          <span style="padding-top: 2px">
            New document
          </span>
        </template>
      </v-btn>
    </div>
    <v-tabs v-model="tab" @change="tabChange">
      <v-tab v-for="(item, index) in items" :key="index">
        <span class="text-capitalize">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in items" :key="index">
        <v-card flat>
          <v-card-text v-if="item.title === 'Docs'">
            <div v-if="collection.children.length === 0">
              This collection is empty.
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "DetailCollection",
  data() {
    return {
      collectionId: null,
      tab: null,
      items: [
        {
          title: "Docs",
          hash: ""
        },
        {
          title: "Recently update",
          hash: "recently-update"
        },
        {
          title: "Search",
          hash: "search"
        }
      ]
    };
  },
  created() {
    let hash = this.$route.hash;
    for (let index = 0; index < this.items.length; index++) {
      if (`#${this.items[index].hash}` === hash) {
        this.tab = index;
        break;
      }
    }
    this.tab = 0;
  },
  mounted() {
    this.collectionId = Number(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.collectionId = to.params.id;
    this.tab = 0;
    next();
  },
  computed: {
    collection() {
      return this.$store.getters.getCollectionById(this.collectionId);
    }
  },
  methods: {
    tabChange(index) {
      history.pushState(
        {},
        null,
        this.$route.path + "#" + this.items[index].hash
      );
    }
  }
};
</script>

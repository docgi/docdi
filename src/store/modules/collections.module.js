import Vue from "vue";
import {
  CREATE_NEW_COLLECTION,
  LOAD_ROOT_COLLECTIONS
} from "@/store/actions.type";
import {
  APPEND_COLLECTION,
  SET_ACTIVE,
  SET_COLLECTIONS
} from "@/store/mutations.type";

const state = {
  collections: [],
};

const getters = {
  getCollections(state) {
    return state.collections;
  }
};

const actions = {
  [LOAD_ROOT_COLLECTIONS]({ commit }) {
    Vue.axios
      .get("collections/")
      .then(response => {
        commit(SET_COLLECTIONS, response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  [CREATE_NEW_COLLECTION]({ commit }, collection) {
    Vue.axios
      .post("collections/", collection)
      .then(response => {
        commit(APPEND_COLLECTION, response.data);
      })
      .catch(error => {
        throw error;
      });
  }
};

const mutations = {
  [SET_COLLECTIONS](state, collections) {
    state.collections = collections;
  },
  [SET_ACTIVE](state, active) {
    state.active = active;
  },
  [APPEND_COLLECTION](state, collection) {
    state.collections.push(collection);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

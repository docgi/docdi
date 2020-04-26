import Vue from "vue";
import { LOAD_ROOT_COLLECTIONS } from "@/store/actions.type";
import { SET_ACTIVE, SET_COLLECTIONS } from "@/store/mutations.type";

const state = {
  collections: [],
  active: undefined
};

const getters = {
  getCollections(state) {
    return state.collections;
  },
  getActive(state) {
    return state.active;
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
  }
};

const mutations = {
  [SET_COLLECTIONS](state, collections) {
    state.collections = collections;
  },
  [SET_ACTIVE](state, active) {
    state.active = active;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

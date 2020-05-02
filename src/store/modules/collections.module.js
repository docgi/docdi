import Vue from "vue";
import {
  CREATE_NEW_COLLECTION,
  LOAD_DETAIL_COLLECTION,
  LOAD_ROOT_COLLECTIONS
} from "@/store/actions.type";
import {
  APPEND_COLLECTION,
  COLLECTION_FILL_CHILDREN,
  SET_ACTIVE,
  SET_COLLECTIONS
} from "@/store/mutations.type";

const state = {
  collections: []
};

const getters = {
  getCollections(state) {
    return state.collections;
  },
  getCollectionById: (state) => (id) => {
    return state.collections.find(collection => collection.id === id)
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
  },
  [LOAD_DETAIL_COLLECTION]({ commit }, collectionId) {
    Vue.axios.get(`collections/${collectionId}/`).then(response => {
      commit(COLLECTION_FILL_CHILDREN, {collectionId, data: response.data});
    });
  }
};

const fillChild = (array, id, data) => {
  if (!(array instanceof Array)) {
    return;
  }
  for (let i = 0; i < array.length; i++) {
    if ("is_collection" in array[i]) {
      if (array[i].id === id) {
        array[i] = {...data};
        break;
      }
      if ("children" in array[i]) {
        fillChild(array[i].children, id, data);
      }
    }
  }
}

const mutations = {
  [SET_COLLECTIONS](state, collections) {
    state.collections = collections;
  },
  [SET_ACTIVE](state, active) {
    state.active = active;
  },
  [APPEND_COLLECTION](state, collection) {
    state.collections.push(collection);
  },
  [COLLECTION_FILL_CHILDREN](state, { collectionId, data }) {
    fillChild(state.collections, collectionId, data);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

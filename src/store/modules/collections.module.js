import Vue from "vue";
import {
  CREATE_NEW_COLLECTION,
  DELETE_COLLECTION,
  LOAD_DETAIL_COLLECTION,
  LOAD_ROOT_COLLECTIONS, UPDATE_COLLECTION_INFO
} from "@/store/actions.type";
import {
  APPEND_COLLECTION,
  COLLECTION_FILL_CHILDREN,
  REMOVE_COLLECTION,
  SET_ACTIVE,
  SET_COLLECTIONS, UPDATE_COLLECTION
} from "@/store/mutations.type";

const state = {
  collections: []
};

const getters = {
  getCollections(state) {
    return state.collections;
  },
  getCollectionById: state => id => {
    return state.collections.find(collection => collection.id === id);
  }
};

const actions = {
  [LOAD_ROOT_COLLECTIONS]({ commit }) {
    return Vue.axios
      .get("collections/")
      .then(response => {
        commit(SET_COLLECTIONS, response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  [CREATE_NEW_COLLECTION]({ commit }, collection) {
    return Vue.axios
      .post("collections/", collection, { errorHandle: false })
      .then(response => {
        commit(APPEND_COLLECTION, response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  [LOAD_DETAIL_COLLECTION]({ commit }, collectionId) {
    return Vue.axios
      .get(`collections/${collectionId}/`)
      .then(response => {
        commit(COLLECTION_FILL_CHILDREN, { collectionId, data: response.data });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  [DELETE_COLLECTION]({ commit }, collectionId) {
    return Vue.axios
      .delete(`collections/${collectionId}/`)
      .then(() => {
        commit(REMOVE_COLLECTION, collectionId);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  [UPDATE_COLLECTION_INFO]({ commit }, collection) {
    return Vue.axios.put(`collections/${collection.id}/`, collection)
      .then(response => {
        commit(UPDATE_COLLECTION, response.data);
      })
      .catch(err => {
        return Promise.reject(err);
      })
  },
};

const fillChild = (array, id, data) => {
  if (!(array instanceof Array)) {
    return;
  }
  for (let i = 0; i < array.length; i++) {
    if ("is_collection" in array[i]) {
      if (array[i].id === id) {
        array[i] = { ...data };
        break;
      }
      if ("children" in array[i]) {
        fillChild(array[i].children, id, data);
      }
    }
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
  },
  [COLLECTION_FILL_CHILDREN](state, { collectionId, data }) {
    fillChild(state.collections, collectionId, data);
  },
  [REMOVE_COLLECTION](state, collectionId) {
    state.collections = state.collections.filter(item => item.id !== collectionId);
  },
  [UPDATE_COLLECTION](state, collection) {
    let index = state.collections.findIndex(item => item.id === collection.id);
    state.collections.splice(index, 1, collection);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

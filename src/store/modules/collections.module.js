import Vue from "vue";
import {
  CREATE_NEW_COLLECTION,
  CREATE_NEW_DOCUMENT,
  DELETE_COLLECTION,
  LOAD_DETAIL_COLLECTION,
  LOAD_ROOT_COLLECTIONS,
  UPDATE_COLLECTION_INFO
} from "@/store/actions.type";
import {
  APPEND_COLLECTION,
  COLLECTION_FILL_CHILDREN,
  FILL_DOCUMENT_INTO_COLLECTION,
  REMOVE_COLLECTION,
  SET_ACTIVE,
  SET_COLLECTIONS,
  UPDATE_COLLECTION,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  SET_TREE_VIEW_OPEN_COLLECTIONS
} from "@/store/mutations.type";

const state = {
  collections: [],
  treeViewOpenCollections: []
};

const getters = {
  getCollections(state) {
    return state.collections;
  },
  getCollectionById: state => id => {
    return state.collections.find(collection => collection.id === id);
  },
  getCollectionsForSelect(state) {
    return state.collections.filter(item => item);
  },
  getTreeViewOpenCollections(state) {
    return state.treeViewOpenCollections;
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
      .post("collections/", collection, )
      .then(response => {
        commit(APPEND_COLLECTION, response.data);
        Vue.notify({
          group: "foo",
          type: "success",
          title: "Create successful"
        });
        return Promise.resolve(response);
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
        Vue.notify({
          group: "foo",
          type: "success",
          title: "Delete successful"
        });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  [UPDATE_COLLECTION_INFO]({ commit }, collection) {
    return Vue.axios.put(`collections/${collection.id}/`, collection)
      .then(response => {
        commit(UPDATE_COLLECTION, response.data);
        Vue.notify({
          group: "foo",
          type: "success",
          title: "Update successful"
        });
      })
      .catch(err => {
        return Promise.reject(err);
      })
  },
  [CREATE_NEW_DOCUMENT]({ commit }, document) {
    return Vue.axios.post("documents/", document)
      .then(response => {
        commit(FILL_DOCUMENT_INTO_COLLECTION, response.data);
        return Promise.resolve(response);
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }
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
  },
  [FILL_DOCUMENT_INTO_COLLECTION](state, document) {
      for (let col of state.collections) {
        if (col.id === document.collection) {
          col.children.push(document);
        }
      }
  },
  [DELETE_DOCUMENT](state, document) {
    for (let col of state.collections) {
      if (col.id === document.collection) {
       col.children = col.children.filter(item => item.id !== document.id);
      }
    }
  },
  [UPDATE_DOCUMENT](state, document) {
    for (let col of state.collections) {
      if (col.id === document.collection) {
        let index = col.children.findIndex(item => item.id === document.id);
        col.children[index] = {...document};
      }
    }
  },
  [SET_TREE_VIEW_OPEN_COLLECTIONS](state, collectionIds) {
    state.treeViewOpenCollections = collectionIds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

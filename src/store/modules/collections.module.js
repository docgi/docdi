import Vue from "vue";
import {
  CREATE_NEW_COLLECTION,
  CREATE_NEW_DOCUMENT,
  DELETE_COLLECTION,
  LOAD_ROOT_COLLECTIONS,
  MAKE_PUBLIC_COLLECTION,
  PUT_COLLECTION,
  PATCH_COLLECTION
} from "@/store/actions.type";
import {
  APPEND_COLLECTION,
  ADD_DOCUMENT,
  REMOVE_COLLECTION,
  SET_COLLECTIONS,
  UPDATE_COLLECTION,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  SET_TREE_VIEW_OPEN_COLLECTIONS,
  SET_DOCUMENTS
} from "@/store/mutations.type";

const state = {
  collections: [],
  documents: []
};

const getters = {
  getCollections(state, getters) {
    return state.collections.map(col => {
      col.children = getters.groupDocuments(col.id);
      return col;
    });
  },
  getCollectionForTree(state, getters) {
    return state.collections.map(col => {
      col.children = getters.groupDocumentsByCollectionAndStatus(col.id, false, true);
      return col;
    });
  },
  getCollectionById: state => id => {
    return state.collections.find(collection => collection.id === id);
  },
  groupDocuments: state => (colId) => {
    return state.documents.filter(item => item.collection === colId);
  },
  groupDocumentsByCollectionAndStatus: state => (
    colId,
    onlyDraft,
    onlyPublished
  ) => {
    if (onlyDraft) {
      return state.documents.filter(
        item => item.collection === colId && item.draft === true
      );
    }

    if (onlyPublished) {
      return state.documents.filter(
        item => item.collection === colId && item.draft === false
      );
    }

    return state.documents.filter(item => item.collection === colId);
  },
  getDocuments(state) {
    return state.documents;
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
      .post("collections/", collection)
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
  [PUT_COLLECTION]({ commit }, collection) {
    return Vue.axios
      .patch(`collections/${collection.id}/`, collection)
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
      });
  },
  [PATCH_COLLECTION]({ commit }, { collectionId, payload }) {
    return Vue.axios
      .patch(`collections/${collectionId}/`, payload)
      .then(response => {
        commit(UPDATE_COLLECTION, response.data);
        Vue.notify({
          group: "foo",
          type: "success",
          title: "Update successful"
        });
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  [CREATE_NEW_DOCUMENT]({ commit }, document) {
    return Vue.axios
      .post("documents/", document)
      .then(response => {
        commit(ADD_DOCUMENT, response.data);
        return Promise.resolve(response);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  [MAKE_PUBLIC_COLLECTION](context, collectionId) {
    return Vue.axios.patch(`collections/${collectionId}/`, { public: true });
  }
};

const mutations = {
  [SET_COLLECTIONS](state, collections) {
    state.collections = collections;
  },
  [APPEND_COLLECTION](state, collection) {
    state.collections.push(collection);
  },
  [REMOVE_COLLECTION](state, collectionId) {
    state.collections = state.collections.filter(
      item => item.id !== collectionId
    );
  },
  [UPDATE_COLLECTION](state, collection) {
    let index = state.collections.findIndex(item => item.id === collection.id);
    state.collections.splice(index, 1, collection);
  },
  [ADD_DOCUMENT](state, document) {
    state.documents.push(document);
  },
  [DELETE_DOCUMENT](state, document) {
    state.documents = state.documents.filter(doc => doc.id !== document.id);
  },
  [UPDATE_DOCUMENT](state, document) {
    for (let [index, doc] of state.documents.entries()) {
      if (doc.id === document.id) {
        state.documents.splice(index, 1, document); // make reactive
      }
    }
  },
  [SET_TREE_VIEW_OPEN_COLLECTIONS](state, collectionIds) {
    state.treeViewOpenCollections = collectionIds;
  },
  [SET_DOCUMENTS](state, documents) {
    state.documents = documents;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

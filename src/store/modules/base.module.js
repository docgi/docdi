import Vue from "vue";
import { SET_AUTH, SET_WORKSPACE, SET_USER } from "@/store/mutations.type";
import { UPDATE_USER, UPDATE_WORKSPACE } from "@/store/actions.type";

const state = {
  isAuthenticated: false,
  user: {},
  workspace: {}
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  currentWorkspace(state) {
    return state.workspace;
  },
};

const mutations = {
  [SET_AUTH](state, data) {
    state.appConfig = data.config;
    state.user = data.user;
    state.workspace = data.workspace;
    state.isAuthenticated = true;
  },
  [SET_WORKSPACE](state, workspace) {
    state.workspace = workspace;
  },
  [SET_USER](state, user) {
    state.user = user;
  }
};

const actions = {
  [UPDATE_WORKSPACE]({ commit }, data) {
    let fd = new FormData();
    for (let key in data) {
      fd.append(key.toString(), data[key]);
    }
    return Vue.axios.patch('workspace/', fd).then((res) => {
      commit("setWorkspace", res.data);
    }).catch(error => {
      throw error.response;
    })
  },
  [UPDATE_USER]({ commit }, data) {
    let fd = new FormData();
    for (let key in data) {
      fd.append(key.toString(), data[key]);
    }
    return Vue.axios.patch('users/me/', fd).then((res) => {
      commit("setUser", res.data);
    }).catch(error => {
      throw error.response;
    })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

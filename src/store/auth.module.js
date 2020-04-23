import Vue from "vue";

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
  setAuth(state, data) {
    state.appConfig = data.config;
    state.user = data.user;
    state.workspace = data.workspace;
    state.isAuthenticated = true;
  },
  setWorkspace(state, workspace) {
    state.workspace = workspace;
  }
};

const actions = {
  async updateWorkspace({ commit }, data) {
    let fd = new FormData();
    for (let key in data) {
      fd.append(key.toString(), data[key]);
    }
    let res = await Vue.axios.patch('workspace/', fd);
    commit("setWorkspace", res.data);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

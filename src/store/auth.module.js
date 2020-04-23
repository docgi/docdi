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
  },
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  updateWorkspace({ commit }, data) {
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
  updateUser({ commit }, data) {
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

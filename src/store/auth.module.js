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
  getAllConfig(state) {
    return state.appConfig;
  }
};

const mutations = {
  setAuth(state, data) {
    state.appConfig = data.config;
    state.user = data.user;
    state.workspace = data.workspace;
    state.isAuthenticated = true;
  }
};

const actions = {
};

export default {
  state,
  mutations,
  actions,
  getters
};

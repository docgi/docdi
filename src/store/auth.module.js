import { getToken } from "../common/token.service";

const state = {
  isAuthenticated: !!getToken(),
  user: {},
  workspace: {}
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  currentWorkspace(state) {
    return state.workspace;
  }
};

const mutations = {
  setAuth(state, data) {
    let currentWorkspace = data.current_workspace;
    delete data.current_workspace;
    state.user = data;
    state.workspace = currentWorkspace;
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

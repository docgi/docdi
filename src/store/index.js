import {getToken} from "../common/token.service"

const state = {
  isAuthenticated: false,
  user: {}
};

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  workspace: state => {
    return state.workspace;
  },
  user: state => {
    return state.user;
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setWorkspace(state, workspace) {
    state.workspace = workspace;
  },
};

export const actions = {
  async loadWorkspace({ commit }) {
    try {
      const res = await this.$http.get("/workspace/");
      const workspace = res.data;
      commit("setWorkspace", workspace);
    } catch (e) {
      this.app.methods.notifyError({
        message: "Loading workspace resource failed."
      });
    }
  },
  async loadUser({ commit }) {
    try {
      const res = await this.$http.get("/users/me/");
      const user = res.data;
      commit("setUser", user);
    } catch (e) {
      this.app.methods.notifyError({
        message: "Loading user resource failed."
      });
    }
  }
};

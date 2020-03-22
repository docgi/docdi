import Vue from "vue";

import { getToken } from "../common/token.service";
import ApiService from "../common/api.service";

const state = {
  isAuthenticated: !!getToken(),
  user: {}
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  currentUser(state) {
    return state.user;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setWorkspace(state, workspace) {
    state.workspace = workspace;
  }
};

const actions = {
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
  },
  checkAuth(context) {
    if (getToken()) {
      ApiService.setToken();
      Vue.$http.get('users/me')
        .then(({data}) => {
          console.log(data);
          console.log(context);
        })
        .catch(({response}) => {
          console.log('error');
          console.log(response);
        })
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

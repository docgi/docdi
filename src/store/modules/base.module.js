import Vue from "vue";
import {SET_AUTH, SET_USER, SET_WORKSPACE, SET_WORKSPACE_MEMBERS} from "@/store/mutations.type";
import { UPDATE_USER, UPDATE_WORKSPACE } from "@/store/actions.type";

const state = {
  isAuthenticated: false,
  user: {},
  workspace: {},
  workspaceMembers: []
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  currentWorkspace(state) {
    return state.workspace;
  },
  workspaceMembers(state) {
    return state.workspaceMembers;
  }
};

const mutations = {
  [SET_AUTH](state, data) {
    state.appConfig = data.config;
    state.user = data.user;
    state.workspace = data.workspace;
    state.isAuthenticated = true;
    state.workspaceMembers = data.members;
  },
  [SET_WORKSPACE](state, workspace) {
    state.workspace = workspace;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_WORKSPACE_MEMBERS](state, workspaceMembers) {
    state.workspaceMembers = workspaceMembers;
  }
};

const actions = {
  [UPDATE_WORKSPACE]({ commit }, data) {
    let fd = new FormData();
    for (let key in data) {
      if (key === "logo" && typeof data["logo"] === "string") {
        continue;
      }
      fd.append(key.toString(), data[key]);
    }
    return Vue.axios
      .patch("workspace/", fd)
      .then(res => {
        commit("setWorkspace", res.data);
        Vue.notify({
          group: "noty",
          type: "success",
          title: "Update successful"
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  [UPDATE_USER]({ commit }, data) {
    let fd = new FormData();
    for (let key in data) {
      if (key === "avatar" && typeof data["avatar"] === "string") {
        continue;
      }
      fd.append(key.toString(), data[key]);
    }
    return Vue.axios
      .patch("users/me/", fd)
      .then(res => {
        commit(SET_USER, res.data);
        Vue.notify({
          group: "noty",
          type: "success",
          title: "Update successful"
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

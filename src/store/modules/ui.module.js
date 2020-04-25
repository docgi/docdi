import { SET_DRAWER, SET_CURRENT_PATH, SET_ERROR } from "@/store/mutations.type";

const isLargeScreen = () => {
  return window.innerWidth >= 960;
};

const state = {
  drawer: isLargeScreen(),
  currentPath: "",
  error: {}
};

const getters = {
  getDrawer(state) {
    return state.drawer;
  },
  getCurrentPath(state) {
    return state.currentPath;
  }
};

const mutations = {
  [SET_DRAWER](state, value) {
    state.drawer = value;
  },
  [SET_CURRENT_PATH](state, currentPath) {
    state.currentPath = currentPath;
  },
  [SET_ERROR](state, error) {
    state.error = error;
  }
};

const actions = {
};

export default {
  state,
  getters,
  actions,
  mutations
}

import { SET_DRAWER, SET_CURRENT_PATH, SET_DIALOG } from "@/store/mutations.type";

const isLargeScreen = () => {
  return window.innerWidth >= 960;
};

const state = {
  drawer: isLargeScreen(),
  currentPath: "",
  dialog: {
    newCollection: false,
    newDocument: false
  }
};

const getters = {
  getDrawer(state) {
    return state.drawer;
  },
  getCurrentPath(state) {
    return state.currentPath;
  },
  getDialog(state) {
    return state.dialog;
  }
};

const mutations = {
  [SET_DRAWER](state, value) {
    state.drawer = value;
  },
  [SET_CURRENT_PATH](state, currentPath) {
    state.currentPath = currentPath;
  },
  [SET_DIALOG](state, dialog) {
    state.dialog = Object.assign(state.dialog, dialog);
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

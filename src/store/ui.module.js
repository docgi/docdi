const isLargeScreen = () => {
  return window.innerWidth >= 960;
};

const state = {
  drawer: isLargeScreen(),
  title: "",
  error: {}
};

const getters = {
  getDrawer(state) {
    return state.drawer;
  },
  getCurrentPath(state) {
    return state.title;
  }
};

const mutations = {
  setDrawer(state, value) {
    state.drawer = value;
  },
  setCurrentPath(state, title) {
    state.title = title;
  },
  setError(state, error) {
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

const isLargeScreen = () => {
  return window.innerWidth >= 960;
};

const state = {
  drawer: isLargeScreen(),
  title: "",
};

const getters = {
  getDrawer(state) {
    return state.drawer;
  },
  getTitle(state) {
    return state.title;
  }
};

const mutations = {
  setDrawer(state, value) {
    state.drawer = value;
  },
  setTitle(state, title) {
    state.title = title;
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

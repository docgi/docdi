const state = {
  drawer: false
};

const getters = {
  getDrawer(state) {
    return state.drawer;
  }
};

const mutations = {
  setDrawer(state, value) {
    state.drawer = value;
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

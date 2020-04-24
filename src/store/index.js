import Vue from "vue";
import Vuex from "vuex";

import base from "./base.module"
import ui from "./ui.module"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    ui,
  }
})

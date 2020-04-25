import Vue from "vue";
import Vuex from "vuex";

import base from "./modules/base.module";
import ui from "./modules/ui.module";
import collections from "./modules/collections.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    base,
    collections,
  }
})

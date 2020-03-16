import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";

import {getToken} from "./token.service";


const ApiService = {
  init() {
    Vue.use(VueAxios, Axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  },

  setToken() {
    Vue.axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${getToken()}`;
  }
};

export default ApiService;

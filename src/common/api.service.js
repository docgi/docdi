import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";

import { getToken } from "./token.service";

const ignoreHandleError = (config) => {
  return !config.errorHandle && config.errorHandle === false;
};

const ApiService = {
  init() {
    Vue.use(VueAxios, Axios);

    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

    Vue.axios.interceptors.response.use(
      response => {
        if (ignoreHandleError(response.config)) {
          return response;
        }
        Vue.notify({
          group: "foo",
          title: "Success"
        });
        return response;
      },
      error => {
        if (ignoreHandleError(error.config)) {
          return Promise.reject(error);
        }
        for (let key in error.response.data) {
          let msg = "";
          if (error.response.data[key] instanceof Array) {
            msg = error.response.data[key][0];
          }
          Vue.notify({
            group: "foo",
            type: "error",
            title: msg
          });
        }
        return Promise.reject(error);
      }
    );
  },

  setToken() {
    Vue.axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  }
};

export default ApiService;

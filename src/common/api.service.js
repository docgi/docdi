import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";

import {getToken} from "./token.service";

const ignoreHandleError = (config) => {
  return !config.errorHandle && config.errorHandle === false;
};

const getErrorMsg = (data) => {
  let res = [];
  for (let key of Object.keys(data)) {
    if (data[key] instanceof String) {
      res.push(data[key]);
    }
    if (data[key] instanceof Array) {
      for (let i = 0; i < data[key].length; i++) {
        res.push(data[key][i]);
      }
    }
  }
  return res;
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
        let msgs = getErrorMsg(error.response.data);
        for (let index = 0; index < msgs.length; index++) {
          Vue.notify({
            group: "foo",
            type: "error",
            title: msgs[index]
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

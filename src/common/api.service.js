import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";

import { getToken } from "./token.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, Axios);

    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

    Vue.axios.interceptors.response.use(
      response => {
        if (!response.config.errorHandle && response.config.errorHandle === false) {
          return response;
        }
        Vue.notify({
          group: "foo",
          title: "Success"
        });
        return response;
      },
      error => {
        if (error.config.errorHandle && error.config.errorHandle === false ) {
          return Promise.reject(error);
        } else {
          Vue.notify({
            group: "foo",
            type: "error",
            title: "Update"
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

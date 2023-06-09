import Vue from 'vue';
import Axios from 'axios';

const defaultAxios = Axios;

const axios = Axios.create({
  baseURL: process.env.VUE_APP_URL_SERVER || "http://192.168.100.200:1421/",
});

Vue.use({
  install(Vue) {
    Vue.prototype.axios = axios;
  }
});

export {
  defaultAxios,
  axios,
};
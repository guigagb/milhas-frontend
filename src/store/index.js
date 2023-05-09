import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import state from "./state";
import * as getters from "./getters";
import mutations from "./mutations";
import * as actions from "./actions";

import tabs from "@/layouts/components/tabs/store";
import movimentacoes from "@/modules/movimentacoes/store";

Vue.use(Vuex);

const modules = {
  tabs,
  movimentacoes,
};

const pathsToNotPersist = ['caches'];

const paths = [
  ...Object.keys(state),
  ...Object.keys(modules),
];

const pathsPersist = paths.filter(path => !pathsToNotPersist.includes(path));

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    tabs,
    movimentacoes,
  },
  plugins: [createPersistedState({
    paths: pathsPersist,
  })],
});
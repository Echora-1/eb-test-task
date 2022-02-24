import Vue from 'vue';
import Vuex from 'vuex';
import { getPartners as getPartnersFromApi } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    partners: [],
  },
  getters: {
    getPartners: (state) => state.partners,
  },
  mutations: {
    setPartners: (state, payload) => {
      state.partners = payload;
    },
  },
  actions: {
    loadPartners: async ({ commit }) => {
      const { data: partners } = await getPartnersFromApi();
      commit('setPartners', partners);
    },
  },
  modules: {
  },
});

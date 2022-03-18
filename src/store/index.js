import Vue from 'vue';
import Vuex from 'vuex';
import {
  getPartners as getPartnersFromApi,
  blockPartner as blockPartnerApi,
  unblockPartner as unblockPartnerApi,
} from '../api';

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
    updatePartnerStatus: (state, { externalId, status }) => {
      state.partners.find((partner) => partner.external_id === externalId).status = status;
    },
  },
  actions: {
    loadPartners: async ({ commit }) => {
      try {
        const { status, data: partners } = await getPartnersFromApi();
        if (status === 200) {
          commit('setPartners', partners);
        }
      } catch (err) {
        console.log(err);
      }
    },

    toggleStatus: async ({ commit }, { externalId, status }) => {
      try {
        let response;
        switch (status) {
          case 'active':
            response = await blockPartnerApi(externalId);
            if (response.status === 200) {
              commit('updatePartnerStatus', { externalId, status: response.data.status });
            }
            return;
          case 'blocked':
            response = await unblockPartnerApi(externalId);
            if (response.status === 200) {
              commit('updatePartnerStatus', { externalId, status: response.data.status });
            }
            return;
          default:
            // eslint-disable-next-line no-throw-literal
            throw 'unknown status';
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});

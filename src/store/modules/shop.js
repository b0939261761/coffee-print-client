import http from '@/utils/http';

export default {
  namespaced: true,
  state: {
    id: 0,
    code: '',
    name: ''
  },
  mutations: {
    setShop(state, { id, code, name }) {
      state.id = id;
      state.code = code;
      state.name = name;
    }
  },
  actions: {
    async getShop({ commit }, { code: incomeCode }) {
      let [id, code, name] = [0, '', ''];
      let response;
      try {
        response = await http.get(`/shops/${incomeCode}`);
      } catch (e) {
        console.log(e);
      }
      if (response.data) ({ id, code, name } = response.data);
      commit('setShop', { id, code, name });
    }

  }
};

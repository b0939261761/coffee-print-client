import http from '@/utils/http';

export default {
  namespaced: true,
  state: {
    id: 0,
    code: '',
    name: ''
  },
  mutations: {
    setdevice(state, { id, code, name }) {
      state.id = id;
      state.code = code;
      state.name = name;
    }
  },
  actions: {
    async getdevice({ commit }, { code: incomeCode }) {
      let [id, code, name] = [0, '', ''];
      let response;
      try {
        response = await http.get(`/devices/${incomeCode}`);
      } catch (e) {
        console.error(e);
      }
      if (response.data) ({ id, code, name } = response.data);
      commit('setdevice', { id, code, name });
    }

  }
};

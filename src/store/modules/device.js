export default {
  namespaced: true,
  state: {
    id: 0,
    code: '',
    name: ''
  },
  mutations: {
    setDevice(state, { id, code, name }) {
      state.id = id;
      state.code = code;
      state.name = name;
    }
  }
};

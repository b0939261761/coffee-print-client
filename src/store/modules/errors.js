export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    add: (state, error) => state.list.push(error),
    remove: (state, error) => state.list.shift(error)
  },
  getters: {
    current: state => state.list[0]
  }
};

export default {
  namespaced: true,
  state: {
    locale: ''
  },
  mutations: {
    setLocale: (state, locale) => state.locale = locale
  },
  actions: {
    setLocale: ({ commit }, locale) => {
      commit('setLocale', locale);
      localStorage.setItem('locale', locale);
    }
  }
};

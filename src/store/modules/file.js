export default {
  namespaced: true,
  state: {
    originalFile: null,
    fileUrl: null
  },
  mutations: {
    setOriginalFile(state, { file }) {
      state.originalFile = file;
    },
    setFileUrl(state, { url }) {
      state.fileUrl = url;
    }
  }
};

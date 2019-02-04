import { getBase64 } from '@/utils/file';

export default {
  namespaced: true,
  state: {
    fileUrl: ''
    // fileUrl: 'http://localhost:4000/000.jpg'
  },
  mutations: {
    setFileUrl(state, { url }) {
      state.fileUrl = url;
    }
  },
  actions: {
    async getFileUrl({ commit }, { file }) {
      let fileUrl = null;
      if (file) fileUrl = await getBase64(file);
      commit('setFileUrl', { url: fileUrl });
    }
  }
};

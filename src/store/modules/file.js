import { getOrientationImage, getBase64 } from '@/utils/file';

export default {
  namespaced: true,
  state: {
    fileUrl: '',
    orientation: 0
  },
  mutations: {
    setFileUrl: (state, { url }) => state.fileUrl = url,
    setOrientation: (state, { orientation }) => state.orientation = orientation
  },
  actions: {
    async getFileUrl({ commit }, { file }) {
      let fileUrl = null;
      let orientation = 0;

      if (file) {
        fileUrl = await getBase64(file);
        orientation = await getOrientationImage(file);
      }

      commit('setFileUrl', { url: fileUrl });
      commit('setOrientation', { orientation });
    }
  }
};

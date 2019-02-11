import Vue from 'vue';
import Vuex from 'vuex';

import device from './modules/device';
import file from './modules/file';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    device,
    file
  },
  strict: process.env.NODE_ENV !== 'production'
});

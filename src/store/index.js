import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import device from './modules/device';
import file from './modules/file';
import errors from './modules/errors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    device,
    file,
    errors
  },
  strict: process.env.NODE_ENV !== 'production'
});

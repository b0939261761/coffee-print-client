import Vue from 'vue';
import Vuex from 'vuex';

import shop from './modules/shop';
import file from './modules/file';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shop,
    file
  },
  strict: process.env.NODE_ENV !== 'production'
});

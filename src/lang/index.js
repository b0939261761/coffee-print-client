import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from '@/store';

import en from './en';
import ru from './ru';
import uk from './uk';

Vue.use(VueI18n);

const messages = { en, ru, uk };

let locale = localStorage.getItem('locale');

if (!locale) {
  const langFull = navigator.language || navigator.userLanguage;
  const lang = langFull && langFull.substr(0, 2);
  locale = ['ru', 'uk'].includes(lang) ? lang : 'en';
  localStorage.setItem('locale', locale);
}

store.commit('app/setLocale', locale);

export default new VueI18n({ locale, messages });

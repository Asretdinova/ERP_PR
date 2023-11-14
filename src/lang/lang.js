import Vue from "vue";
import VueI18n from "vue-i18n";
import uz from './i18n/uz';
import ru from './i18n/ru';
import en from './i18n/en';
import { store } from '../store/index';
Vue.use(VueI18n);

const locales = {
  en: {
    message: en
  },
  ru: {
    message: ru
  },
  uz: {
    message: uz
  },
};
const i18n = new VueI18n({
  locale: store.getters.selectedLocale.suffix,
  messages: locales
});

export default i18n;

import Vuex from "vuex";
import Vue from "vue";
import config from "./modules/config";
import verticalSidebar from "./modules/verticalSidebar";
import largeSidebar from "./modules/largeSidebar";
import scrumboard from "./modules/scrumboard";
import compactSidebar from "./modules/compactSidebar";
import user from "./modules/user";
import settings from './modules/settings';

// Load Vuex
Vue.use(Vuex);

// Create store
export const store = new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    config,
    verticalSidebar,
    scrumboard,
    settings,
    user
  }
});


export default store

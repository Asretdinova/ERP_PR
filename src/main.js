// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";

import Breadcumb from "./components/breadcumb";

import i18n from "./lang/lang";

Vue.component("breadcumb", Breadcumb);
// Vue.use(VueRouter);
import './permission' // permission control

Vue.use(GullKit);
Vue.config.productionTip = false;
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);

import jQuery from 'jquery'

/*import UploadImage from 'vue-upload-image';

Vue.component('upload-image', UploadImage)*/
window.$ = window.jQuery = jQuery
global.$ = global.jQuery = jQuery
$.extend(true, $.fn.datetimepicker.defaults, {
  icons: {
    time: 'i-Over-Time',
    date: 'i-Calendar-4',
    up: 'i-Triangle-Arrow-Up',
    down: 'i-Down-3',
    previous: 'i-Arrow-Left-2',
    next: 'i-Arrow-Right-2',
    today: 'i-Calendar-4',
    clear: 'i-Remove',
    close: 'i-Close'
  }
});
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");

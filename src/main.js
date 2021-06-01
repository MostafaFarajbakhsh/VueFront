// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// import vuetify from './plugins/vuetify';
// import { store } from './Store/Store';
// import App from './App.vue';

import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import store from './Store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import { Routes } from './Routes'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  position: 'bottom-right',
  timeout: 5111,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: true,
}

Vue.config.productionTip = false
Vue.use(Toast, options)
Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.use(VueRouter)

Vue.http.options.root = 'http://localhost:5086/'
// Vue.http.options.root = 'http://localhost/'

export const router = new VueRouter({
  routes: Routes,
  base: process.env.BASE_URL,
  mode: 'history',
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

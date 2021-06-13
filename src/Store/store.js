import Vue from 'vue'
import Vuex from 'vuex'
import User from './Modules/Users'
import Letter from './Modules/Letters'
import Folder from './Modules/Folders'
import OghafCost from './Modules/OghafCost'
import FolderAndUser from './Modules/FolderAndUser'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  modules: { User, Letter, Folder, OghafCost, FolderAndUser },
})

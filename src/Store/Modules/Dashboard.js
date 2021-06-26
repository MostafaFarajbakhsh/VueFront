// import Vue from 'vue'
// import { router } from '../../main'

const state = {
  PictureAddress: '../../../../assets/images/users.jpg',
}
const getters = {
  getImagesAddress (state) {
    return state.PictureAddress
  },
}
const mutations = {
}
const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions,
}

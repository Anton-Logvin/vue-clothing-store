import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import auth from './modules/auth'

import user from './modules/user'
import cartModule from './modules/cartModule'
import productsFb from './modules/productsFb'

// import { collection, getDocs } from 'firebase/firestore'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  
  modules: {
    user,
    cartModule,
    productsFb
  },

  state: {
    indexImage: 0,
    disabled: false,
  },

  getters: {
  
  },

  mutations: {
    disableButton(state, changeFilterOption) {
      changeFilterOption ? state.disabled = true : state.disabled = false
      if(state.disabled === false) {
        state.filteredProducts = state.products
      }
    },
  },

  actions: {
    disableButton({commit, }, checkBox) {
      commit('disableButton', checkBox)
      // dispatch('disableButtonToColors')
    },
  }
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: [],
    cart: []
  },

  getters: {
    productList: state => state.products,
    cart(state) {
      return state.cart
    },
    prodProd() {
      return console.log('ppppp')
    }
  },

  mutations: {
    getProductList(state, payload) {
      state.products = payload
    },
  },

  actions: {
    getProducts({ commit }) {
      axios.get('/products.json').then((response) => {
        commit('getProductList', response.data)
      })
    },
  }
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: [],
    cart: [],
    indexImage: 0
  },

  getters: {
    productList: state => state.products,
    
    cart: (state) => state.cart,

    indexImageGetter(state) {
      return state.indexImage
    },

    totalPrice(state) {
      let sum = 0
      state.cart.forEach(item => {
        sum += item.price
      })
      return sum
    },
  },

  mutations: {
    getProductList(state, payload) {
      state.products = payload
    },
  
    IndexImageProduct(state, selectedProduct) {
      state.indexImage = selectedProduct
    },

    addProductToCart(state, product) {
      state.cart.push(product)
    },

    addProductsFromStorage(state, products) {
      state.cart = products
    },

    deleteProductFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id) || []
    },
  },

  actions: {
    getProducts({ commit }) {
      axios.get('/products.json').then((response) => {
        commit('getProductList', response.data)
      })
    },

    getIndexImageProduct({commit}, selectedProduct) {
      commit('IndexImageProduct', selectedProduct)
    },

    addProductToCart({ commit, dispatch }, product) {
      commit('addProductToCart', product)
      dispatch('saveToStorage')
    },

    deleteProductFromCart({ commit, dispatch}, id) {
      commit('deleteProductFromCart', id)
      dispatch('saveToStorage')
    },

    saveToStorage({ state }) {
      sessionStorage.setItem('cart', JSON.stringify(state.cart));
    },

    setCartFromStorage({ commit }) {
      const products = JSON.parse(sessionStorage.getItem('cart'));
      if (products && products.length) {
        commit('addProductsFromStorage', products)
      }
    },
  }
})

export default store
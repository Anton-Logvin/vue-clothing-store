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
    // productItem(productList) {
    //   return productList.find(item => item === item.id)
    // },
    productById(state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    },

    cart(state) {
      const products = sessionStorage.getItem('cart')
      return products ? JSON.parse(products) : state.cart
    },
  },

  mutations: {
    getProductList(state, payload) {
      state.products = payload
    },

    addProductToCart(state, product) {
      state.cart.push(product)
    }
  },

  actions: {
    getProducts({ commit }) {
      axios.get('/products.json').then((response) => {
        commit('getProductList', response.data)
      })
    },

    addProductToCart({ commit }, product) {
      const cart = sessionStorage.getItem('cart') || []

      if(cart.length) {
        const cartProducts = JSON.parse(cart)
        const allProducts = [...cartProducts, product]
        sessionStorage.setItem('cart', JSON.stringify(allProducts));
        commit('addProductToCart', allProducts)
      } else {
        const selectedProduct = JSON.stringify([product])
        sessionStorage.setItem('cart', selectedProduct);
        commit('addProductToCart', product)
      }
    }
  }
})

export default store
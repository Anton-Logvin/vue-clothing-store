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
    
    cart(state) {
      const products = sessionStorage.getItem('cart')
      return products ? JSON.parse(products) : state.cart
    },

    indexImageGetter(state) {
      return state.indexImage
    }
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
    removeFromCart(state, index) {
      const cart = sessionStorage.getItem('cart') || []
      const allProducts = JSON.parse(cart)
      allProducts.splice(index, 1)
      sessionStorage.setItem('cart', JSON.stringify(allProducts));
      // sessionStorage.removeItem(index);
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
    },

    removeProductFromCart({commit}, index) {
      
      commit('removeFromCart', index)
    },
  }
})

export default store
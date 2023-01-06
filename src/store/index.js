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

    totalPrice(state) {
      let sum = 0
      state.cart.forEach(item => {
        sum += item.price * item.quantityInCart
      })
      return sum
      // const sum = state.cart.reduce((sum, elem) => sum + elem)
      // console.log(sum)
      // return sum
    },

    cartLength(state) {
      let amountCartProduct = 0
      state.cart.forEach((item) => amountCartProduct += item.quantityInCart)
      return amountCartProduct
    },

    getIndexImageProduct(state) {
      // console.log(state.indexImage)
      return state.indexImage
    }
  },

  mutations: {
    getProductList(state, payload) {
      state.products = payload
    },
  
    addProductToCart(state, product) {
      if(state.cart.length) {
        let isProductExist = false
        state.cart.map(function(item){
          if (item.id === product.id){
            isProductExist = true
            item.quantityInCart++
            if(item.quantityInCart >= item.quantity) {
              alert('Большего количества товара нет!!!')
            }
          }
        })
        if(!isProductExist) {
          state.cart.push(product)
          product.quantityInCart = 1
        }
      } else {
        state.cart.push(product)
        product.quantityInCart = 1
      }
    
    },
    increment(state, index) {
      state.cart[index].quantityInCart++
      if (state.cart[index].quantityInCart > state.cart[index].quantity) {
        state.cart[index].quantityInCart = state.cart[index].quantity
        alert('Большего количества товара нет!!!')
        
      }
    },
    decrement(state, index) {
      if(state.cart[index].quantityInCart > 1) {
      state.cart[index].quantityInCart--
      }
    },

    addProductsFromStorage(state, products) {
      state.cart = products
    },

    deleteProductFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id) || []
    },

    IndexImageProductToCart(state, indexPhoto) {
      state.indexImage = indexPhoto
      // console.log(state.indexImage)
    }
  },

  actions: {
    getProducts({ commit }) {
      axios.get('/products.json').then((response) => {
        commit('getProductList', response.data)
      })
    },

    addProductToCart({ commit, dispatch }, product) {
      commit('addProductToCart', product)
      dispatch('saveToStorage')
    },

    incrementItemInCart({commit, dispatch}, index) {
      commit('increment', index)
      dispatch('saveToStorage')
    },
    decrementItemInCart({commit, dispatch}, index) {
      commit('decrement', index)
      dispatch('saveToStorage')
    },

    deleteProductFromCart({ commit, dispatch}, id) {
      commit('deleteProductFromCart', id)
      dispatch('saveToStorage')
    },

    cartIndexImageProduct({commit, dispatch}, indexPhoto) {
      commit('IndexImageProductToCart', indexPhoto)
      dispatch('saveToStorage')
    },

    saveToStorage({ state }) {
      sessionStorage.setItem('cart', JSON.stringify(state.cart));
      // sessionStorage.setItem('indexImage', JSON.stringify(state.indexImage))
    },
    // setQuantityInCart({commit}) {
    //   commit('setQuantityInCart', )
    // },

    setCartFromStorage({ commit }) {
      const products = JSON.parse(sessionStorage.getItem('cart'));
      if (products && products.length) {
        commit('addProductsFromStorage', products)
      }
    },
  }
})

export default store
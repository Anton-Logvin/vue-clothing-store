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
    indexImage: 0,
    productColors: [],
    filteredProducts: [],
    minPrice: 0,
    maxPrice: 90
  },

  getters: {
    productList(state) {
      console.log(state.products)
      return state.products
    },

    filteredProductsList(state) {
      console.log(state.filteredProducts)
      return state.filteredProducts
    },

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

    minProductPrice(state) {
      let priceProducts = []
      // console.log(state.products)
      state.products.forEach(item => {
        item = item.price
        priceProducts.push(item)
      })
      return Math.min.apply(null, priceProducts)
    },

    maxProductPrice(state) {
      
      let priceProducts = []
      state.products.forEach(item => {
        item = item.price
        priceProducts.push(item)
      })
      return Math.max.apply(null, priceProducts)
    },

    cartLength(state) {
      let amountCartProduct = 0
      state.cart.forEach((item) => amountCartProduct += item.quantityInCart)
      return amountCartProduct
    },

    getIndexImageProduct(state) {
      return state.indexImage
    },

    allProductColors(state, productColors) {
      productColors = [...new Set(state.products.map(item => item = item.colors).flat(2))]
      return productColors
    },

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
              item.quantityInCart = item.quantity
              alert('Большего товара нет!!!')
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
        alert('Большего товара нет!!!')
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
    },



    filteredProducts(state, filterSetting) {
      let arr = []
      for(const product of state.products) {
        
        if(product.price < filterSetting.priceRange.maxPrice && product.price > filterSetting.priceRange.minPrice) {
        
          if(filterSetting.category.cap && product.category === 'cap') {
            arr.push(product)
            console.log(arr)
          }
          if(filterSetting.category.tshirt && product.category === 't-shirt') {
            arr.push(product)
          }
          if(filterSetting.category.socks && product.category === 'socks') {
            arr.push(product)
          }
          
        }
         else {
          arr.push(product)
        }
      }
      if(arr.length) {
        state.filteredProducts = arr
        console.log(state.filteredProducts)
      } else {
        state.filteredProducts = state.products
      }
      if(filterSetting.colors.length) {
        let result = []
        for(const item of state.filteredProducts) {
          for(const color of filterSetting.colors) {
            if(item.colors.includes(color)) {
              result.push(item)
            }
            state.filteredProducts = [...new Set(result)]
          }
          
        }
        console.log(state.filteredProducts)
      } else { 
          state.filteredProducts = state.products
          console.log(state.filteredProducts)
        }
    }
  },

  actions: {
    getProducts({ commit }) {
      axios.get('/products.json').then((response) => {
        commit('getProductList', response.data)
        // dispatch('minPriceProducts')
        // dispatch('maxPriceProducts')
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

    // minPriceProducts({commit}) {
    //   commit('minProductPrice')
    // },
    // maxPriceProducts({commit}) {
    //   commit('maxProductPrice')
    // },

    filteredProducts({commit,}, filterSetting) {
      console.log(filterSetting)
      commit('filteredProducts', filterSetting)
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
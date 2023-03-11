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
    orderList: [],
    disabled: false,
    numberOrder: 1
  },

  getters: {
    productList(state) {
      return state.products
    },

    filteredProductsList(state) {
      return state.filteredProducts
    },

    cart: (state) => state.cart,

    totalPrice(state) {        
      const res = state.cart.reduce((sum, product) => sum + product.price * product.quantityInCart, 0)
      return res
    },

    minProductPrice(state) {
      return Math.min(...state.products.map(item => item.price))
    },

    maxProductPrice(state) {
      return Math.max(...state.products.map(item => item.price))
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
      state.filteredProducts = payload
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
      if(state.cart[index].quantityInCart > state.cart[index].quantity) {
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

    addToOrderList(state, objOrder) {
      state.orderList.push(objOrder)
      console.log(state.orderList)
    },

    IndexImageProductToCart(state, indexPhoto) {
      state.indexImage = indexPhoto
    },

    searchByNameProduct(state, searchText) {
      let searchProducts = state.products
      if(searchText) {
        searchProducts = searchProducts.filter(product => {
          return product.title.toLowerCase().includes(searchText.toLowerCase())
        })
      }
      state.filteredProducts = searchProducts
    },

    filteredProducts(state, filterSetting) {
      let filteredProducts = state.products;

      const { category, priceRange, colors } = filterSetting

      // Category filter
      const selectedCategories = Object.entries(category).filter(item => item[1]).map(item => item[0])
      if (selectedCategories.length) {
        filteredProducts = filteredProducts.filter(product => {
          return selectedCategories.includes(product.category)
        })
      }

      // Price filter
      if (priceRange.minPrice || priceRange.maxPrice) {
        filteredProducts = filteredProducts.filter(product => {
          return product.price >= filterSetting.priceRange.minPrice && product.price <= filterSetting.priceRange.maxPrice
        })
      }

      // Colors filter
      if (colors.length) {
        state.disabled = true
        filteredProducts = filteredProducts.filter(product => {
          if (product.colors.some(color => colors.includes(color))) return product
        })
      }
      state.filteredProducts = filteredProducts
      // console.log(state.filteredProducts)
    },

    clearFilter(state) {
      //?????????????
      state.filteredProducts = state.products
      state.disabled = false
    },

    disableButton(state, changeFilterOption) {
      changeFilterOption ? state.disabled = true : state.disabled = false
      if(state.disabled === false) {
        state.filteredProducts = state.products
      }
    },

    getOrderNumber(state) {
      state.numberOrder++
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

    searchByNameProduct({ commit }, value) {
      commit('searchByNameProduct', value)
      // commit('filteredProducts')
    },

    filteredProducts({ commit }, filterSetting) {
      commit('filteredProducts', filterSetting)
    },

    clearFilter({ commit }) {
      commit('clearFilter')
    },

    disableButton({commit, }, checkBox) {
      commit('disableButton', checkBox)
      // dispatch('disableButtonToColors')
    },
    
    addToOrderList({commit}, objOrder)  {
      commit('addToOrderList', objOrder)
    },

    getOrderNumber({commit}) {
      commit('getOrderNumber')
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
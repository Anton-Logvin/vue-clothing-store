import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import auth from './modules/auth'

import user from './modules/user'
import cartModule from './modules/cartModule'
import productsFirestore from './modules/products'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  
  modules: {
    user,
    cartModule,
    productsFirestore
  },

  state: {
    products: [],
    indexImage: 0,
    productColors: [],
    filteredProducts: [],
    orderList: [],
    disabled: false,
    numberOrder: 1,
  },

  getters: {
    productList(state) {
      return state.products
    },

    filteredProductsList(state) {
      return state.filteredProducts
    },

    minProductPrice(state) {
      return Math.min(...state.products.map(item => item.price))
    },

    maxProductPrice(state) {
      return Math.max(...state.products.map(item => item.price))
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
  
    // addProductsFromStorage(state, products) {
    //   state.cart = products
    // },

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
  }
})

export default store
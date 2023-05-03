import Vue from 'vue'
import { collection, getDocs } from 'firebase/firestore'

export default {
  namespaced: true,

  state: {
    products: [],
    
    indexImage: 0,
    productColors: [],
    filteredProducts: [],
  },

  getters: {
    productList: (state) => state.products,

    filteredProductsList(state) {
      return state.filteredProducts
    },

    minProductPrice(state) {
      return Math.min(...state.products.map(item => item.price))
    },

    maxProductPrice(state) {
      return Math.max(...state.products.map(item => item.price))
    },

    // getIndexImageProduct(state) {
    //   return state.indexImage
    // },

    allProductColors(state, productColors) {
      productColors = [...new Set(state.products.map(item => item = item.colors).flat(1))]
      return productColors
    },
  },

  mutations: {
    getProductList(state, payload) {
      state.products = payload
      state.filteredProducts = payload
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
  },

  actions: {
    async getProducts({commit}) {
      const productList = []
      const querySnapshot = await getDocs(collection(Vue.$db, "products"));
  
      querySnapshot.docs.forEach((doc) => {
        productList.push(doc.data())
      });
      commit('getProductList', productList)
    },

    searchByNameProduct({ commit }, value) {
      commit('searchByNameProduct', value)
    },

    filteredProducts({ commit }, filterSetting) {
      commit('filteredProducts', filterSetting)
    },

    clearFilter({ commit }) {
      commit('clearFilter')
    },
   
  }
}


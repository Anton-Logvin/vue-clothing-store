export default {
  namespaced: true,

  state: {
    cart: [],
    numberOrder: 1,
    orderList: [],
  },
  
  getters: {
    cart: (state) => state.cart,

    totalPrice(state) {        
      const res = state.cart.reduce((sum, product) => sum + product.price * product.quantityInCart, 0)
      return res
    },

    cartLength(state) {
      let amountCartProduct = 0
      state.cart.forEach((item) => amountCartProduct += item.quantityInCart)
      return amountCartProduct
    },

    nunberOrderGet(state) {
      return state.numberOrder
    }
  },

  mutations: {
    addProductToCart(state, product) {
      if(state.cart.length) {
        let isProductExist = false
        state.cart.map(function(item){
          if (item.id === product.id){
            isProductExist = true
            item.quantityInCart++
            state.productInCartQuantity = item.quantityInCart
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
        alert('Больше товара нет!!!')
        
        
      }
    },

    decrement(state, index) {
      if(state.cart[index].quantityInCart > 1) {
        state.cart[index].quantityInCart--
      }
    },

    deleteProductFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id) || []
    },

    IndexImageProductToCart(state, indexPhoto) {
      state.indexImage = indexPhoto
    },

    addProductsFromStorage(state, products) {
      state.cart = products
    },

    getOrderNumber(state) {
      state.numberOrder++
    },

    addToOrderList(state, objOrder) {
      state.orderList.push(objOrder)
    },
  },
 
  actions: {
    addProductToCart({ commit, dispatch }, product) {
      commit('addProductToCart', product)
      dispatch('saveToStorage')
      dispatch('setCartFromStorage')
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
    },
  
    setCartFromStorage({ commit }) {
      const products = JSON.parse(sessionStorage.getItem('cart'));
      if (products && products.length) {
        commit('addProductsFromStorage', products)
      }
    },

    getOrderNumber({commit}) {
      commit('getOrderNumber')
    },

    addToOrderList({commit}, objOrder)  {
      commit('addToOrderList', objOrder)
    },
  }
}
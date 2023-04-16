import Vue from 'vue'
import { collection, getDocs } from 'firebase/firestore'


export default {
  namespaced: true,

  state: {
    productsFirestore: [],
  },

  gettters: {
    getProductsFirestore(state) {
      console.log(state.productsFirestore)
      return state.productsFirestore
    },
  },

  mutations: {
    setProducts(state, payload) {
      console.log(payload)
      state.productsFirestore = payload
    },
  },

  actions: {
    async loadProducts({commit}) {
      const productList = []
      const querySnapshot =await getDocs(collection(Vue.$db, "products"));
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        productList.push(doc.data())
        // commit('getProducts', doc.data)
      });
      console.log(productList)
      commit('setProducts', productList)
    },
  }
}
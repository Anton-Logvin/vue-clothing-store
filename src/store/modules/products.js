import Vue from 'vue'

export default {
  state: {
    productsFirestore: ['aaa']
  },

  gettters: {},

  mutations: {
    setProducts(state, payload) {
      state.productsFirestore = payload
    }
  },

  actions: {
    loadProducts({ commit }) {
      console.log(Vue.$db)
      Vue.$db.collection('products')
      .get()
      .then(querySnapshot => {
        let products = []
        querySnapshot.forEach(el => {
          const data = el.data()
          let product = {
            id: el.id,
            title: data.title,
            selectedProduct: data.selectedProduct,
            quantity: data.quantity,
            price: data.price,
            availability: data.availability,
            shipping: data.shipping,
            isSale: data.isSale,
            category: data.category,
            colors: data.colors.slice(),
            images: data.images.slice(),
          }
          console.log(product)
          products.push(product)
        });
        commit('setProducts', products)
      })
      .cath(error => console.log(error))
    }
  }
}
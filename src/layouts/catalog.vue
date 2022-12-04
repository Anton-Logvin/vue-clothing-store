<template>
  <div class="page">
    <h2>Product Main Page</h2>
    <div class="title-container">
      <div class="bacground-v"></div>
      <side-bar />
      <div v-if="products.length" class="items-product container">
        <product-cart
          v-for="product in products"
          :key="product.id"
          :product="product" 
          @click.native="goToProduct(product.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from '@/components/widgets/product/ProductCart'
import SideBar from '@/components/SideBar'

export default {
  name: 'CatalogPage',

  components: { ProductCart, SideBar },

  computed: {
    products() {
      return this.$store.getters['productList']
    },
  },

  methods: {
    goToProduct(id) {
      this.$router.push({
        name: 'product', 
        params: { id }
      })
    },

    getProducts() {
      this.$store.dispatch('getProducts')
    }
  },

  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.items-product {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.bacground-v {
  opacity: 0.2;
  z-index: -1;
  height: 100%;
  width: 100%;
  position: absolute;
  background: url('https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg') no-repeat top center;
}

.title-container {
  position: relative;
}
</style>
<template>
  <div class="catalog">
    <h2>Product catalog</h2>
      <!-- <catalog-filter /> -->
    <div class="catalog__body">
      <div class="catalog__bacground-v"></div>
      <side-bar class="catalog__filters"/>
      <div v-if="filteredProducts.length" class="catalog__items container">
        <product-card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product" 
          @click.native="goToProduct(product.id)" 
        />
      </div>
    </div>
    
    <router-link 
      class="catalog__btn-to-up" 
      to="/catalog" 
      @click.native="scrollToTop"
    >
      to Up
    </router-link>
    
  </div>
</template>

<script>
import ProductCard from '@/components/widgets/product/ProductCard'
import SideBar from '@/components/SideBar'
// import CatalogFilter from '@/components/CatalogFilter'


export default {
  name: 'CatalogPage',
  
  data() {
    return {
      jopa: true
    }
  },
  
  components: { 
    ProductCard, 
    SideBar,
    // CatalogFilter
  },
 
  computed: {
    filteredProducts() {
      return this.$store.getters['filteredProductsList']
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
    },

    searchTitleProduct(searchTitle) {
      this.searchTitle = searchTitle
      console.log(this.searchTitle)
    },

    scrollToTop() {
      window.scrollTo(0,0);
    },
  },

  created() {
    this.getProducts()
  }
}

</script>

<style lang="scss" scoped>
.catalog {
  &__body {
    position: relative;
  }

  &__filters {
    // margin-top: 30px;
  }

  &__bacground-v {
    opacity: 0.2;
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;
    background: url('https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg') no-repeat top center;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__to-up {
    background: rgba(0, 60, 255, 0.027);
  }

  &__btn-to-up {
    opacity: 1;
    text-decoration: none;
    // background-color: #3498db;
    color: rgb(180, 0, 180);
    padding: 15px 15px;
    border-radius: 5px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    border: 1px solid rgb(180, 0, 180);
  }
}
</style>
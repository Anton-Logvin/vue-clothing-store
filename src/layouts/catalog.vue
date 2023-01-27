<template>
  <div class="catalog">
    <h2>Product catalog</h2>
    
    <catalog-filter 

    />
  <!-- <button @click="searchTitleProduct">search</button> -->

    <div>
      <input 
        v-model="searchTitle" 
        type="text" 
        placeholder="search product"
    >
    </div>

    <div class="catalog__body">
      <div class="catalog__bacground-v"></div>
      <side-bar />
      <div v-if="filteredProducts.length" class="catalog__items container">
        <product-card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product" 
          @click.native="goToProduct(product.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/widgets/product/ProductCard'
import SideBar from '@/components/SideBar'
import CatalogFilter from '@/components/CatalogFilter'


export default {
  name: 'CatalogPage',
  
  components: { 
    ProductCard, 
    SideBar,
    CatalogFilter
  },

  data() {
    return {
      // filterProducts: [],
      minPrice: 0,
      maxPrice: 100,
      changedColor: '',
      searchTitle: ''
    }
  },

  computed: {
    filteredProducts() {
      return this.$store.getters['filteredProductsList']
    },
    
    // sortedProducts() {
    //   if (this.filterProducts.length) {
    //     return this.filterProducts.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)
    //   } else {
    //     return this.$store.getters['productList'].filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)
    //   }
    // },

    // searchByNameProduct() {
    //   return this.sortedProducts.filter(product => {
    //     return product.title.toUpperCase().indexOf(this.searchTitle.toUpperCase()) > -1
    //   })
    // },

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

    // sortByCategories(changeCategories) {
    //   this.filterProducts = []
    //   const allProducts = this.$store.getters['productList']
    //   for(let i = 0; i < allProducts.length; i++) {
    //     if(changeCategories.join().includes(allProducts[i].category)) {
    //       this.filterProducts.push(allProducts[i])
    //     }
    //   } 
    // },

    // setRangeSliders(minPrice, maxPrice) {
    //   this.minPrice = minPrice
    //   this.maxPrice = maxPrice
    // },

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
}
</style>
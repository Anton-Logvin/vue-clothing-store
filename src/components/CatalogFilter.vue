<template>
  <div class="filter">
    <!-- TODO: Сделать поиск сразу используюя функцию debounce -->
    <custom-input v-model="search" />
    
    <div>
      <p>Категории</p>
      <custom-checkbox  v-model="category.tshirt" label="Майки" />
      <custom-checkbox  v-model="category.cap" label="Кeпки" />
      <custom-checkbox  v-model="category.socks" label="Носки" />
    </div>

    <custom-price-filter v-model="priceRange" />

    <custom-colors-filter v-model="colors" />

    <button @click="filterData">Применить</button>
    <button>Сбросить</button>
  
  </div>
</template>

<script>
import CustomCheckbox from './form/CustomCheckbox'
import CustomColorsFilter from './form/CustomColorsFilter'
import CustomInput from './form/CustomInput'
import CustomPriceFilter from './form/CustomPriceFilter'

export default {
  name: 'CatalogFilter',

  data() {
    return {
      search: "",
      category: {
        tshirt: false,
        cap: false,
        socks: false,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 0
      },
      colors: [],
    }
  },
  // created() {
    
  //   this.$store.dispatch('getProducts')
    
  // },
  computed: {
  
  },

  components: {
    CustomCheckbox,
    CustomPriceFilter,
    CustomColorsFilter,
    CustomInput,
  },

  methods: {
    maxPrice() {
      this.maxPrice = this.$store.getters['maxProductPrice']
      return this.maxPrice
    },
    
    changeColorProducts(changedColor) {
      this.$emit('changeColorProducts', changedColor)
    },

    filterData() {
      const filterSetting = {
      category: this.category,
      priceRange: this.priceRange,
      colors: this.colors,
    }
      return this.$store.dispatch('filteredProducts', filterSetting)
    }
  },
 
  // created() {
  //   this.filterData()
  // }
}
</script>

<style lang="scss">
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}


</style>
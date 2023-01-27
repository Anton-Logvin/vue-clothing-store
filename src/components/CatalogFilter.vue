<template>
  <form class="filter">
    <!-- TODO: Сделать поиск сразу используюя функцию debounce -->
    <custom-input v-model="search" />
    
    <div>
      <p>Категории</p>
      <custom-checkbox  v-model="category['t-shirt']" label="Майки" />
      <custom-checkbox  v-model="category.cap" label="Кeпки" />
      <custom-checkbox  v-model="category.socks" label="Носки" />
    </div>

    <custom-price-filter v-model="priceRange" />

    <custom-colors-filter v-model="colors" />

    <button @click="filterData">Применить</button>
    <button type="reset" @click="resetFilter">Сбросить</button>
  </form>
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
        "t-shirt": false,
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
  
  computed: {},

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
      const { category, priceRange, colors } = this
      this.$store.dispatch('filteredProducts', { category, priceRange, colors })
    },

    resetFilter() {
      this.$store.dispatch('clearFilter');
    }
  },
}
</script>

<style lang="scss">
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}


</style>
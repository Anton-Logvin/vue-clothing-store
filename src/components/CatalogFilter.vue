<template>
  <form class="filter">
    <!-- TODO: Сделать поиск сразу используюя функцию debounce -->
    <custom-input v-model="search"/>

    <div>
      <p>Категории</p>
      <custom-checkbox  v-model="category['t-shirt']" label="Майки" />
      <custom-checkbox  v-model="category.cap" label="Кeпки" />
      <custom-checkbox  v-model="category.socks" label="Носки" />
    </div>

    <custom-price-filter :key="refresh" v-model="priceRange" />

    <custom-colors-filter v-model="colors" />

    <button type="button" :disabled="!isDisabled" @click="filterData">Применить</button>
    <button type="reset" :disabled="!isDisabled" @click="resetFilter">Сбросить</button>
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
      refresh: false,
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

  components: {
    CustomCheckbox,
    CustomPriceFilter,
    CustomColorsFilter,
    CustomInput,
  },

  watch: {
    search(val) {
      this.$store.dispatch('searchByNameProduct', val)
    }
  },

  computed: {
    isDisabled() {
      Object.values(this.category).forEach(item => { 
        if(item === true) this.$store.dispatch('disableButton', item)
      })
        if(this.colors.length) this.$store.dispatch('disableButton', true)
      return this.$store.state.disabled 
    }
  },

  methods: {
    maxPrice() {
      this.maxPrice = this.$store.getters['maxProductPrice']
    },

    filterData() {
      const { category, priceRange, colors } = this
      this.$store.dispatch('filteredProducts', { category, priceRange, colors })
    },

    resetFilter() {
      this.refresh = !this.refresh
      // const { category, colors } = this
      // this.$store.dispatch('clearFilter', { category, colors })
      // this.colors = []
      // this.category = {"t-shirt": false, cap: false, socks: false,}
      // this.priceRange.minPrice = this.$store.getters.minProductPrice
      // this.priceRange.maxPrice = this.$store.getters.maxProductPrice
    },
  },
}

</script>

<style lang="scss">
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

</style>
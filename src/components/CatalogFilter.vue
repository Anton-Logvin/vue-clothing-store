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

    <custom-button 
      :title="buttonApplyTitle" 
      :disabled="!isDisabled" 
      @click="filterData"
      :class="{'active-apply':isDisabled===true}"
    />
    <custom-button 
      :title="buttonResetTitle" 
      :disabled="!isDisabled" 
      @click="resetFilter"
      :class="{'active-reset':isDisabled===true}"
    />
    
  </form>
</template>

<script>
import CustomButton from './form/CustomButton'
import CustomCheckbox from './form/CustomCheckbox'
import CustomColorsFilter from './form/CustomColorsFilter'
import CustomInput from './form/CustomInput'
import CustomPriceFilter from './form/CustomPriceFilter'

export default {
  name: 'CatalogFilter',

  data() {
    return {
      buttonApplyTitle: 'Применить',
      buttonResetTitle: 'Сбросить',
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
    CustomButton,
  },

  watch: {
    search(val) {
      this.$store.dispatch('searchByNameProduct', val)
    },
  },

  computed: {
    isDisabled() {
      let arr = []
      Object.values(this.category).forEach(item => { 
        if(item === true) { 
          arr.push(item)
          } 
      })
        if(arr.length || this.colors.length) {
          this.$store.dispatch('disableButton', true)
        } else {
          this.$store.dispatch('disableButton', false)
        }
     
        //disabled priceRange
      // if(this.priceRange.minPrice != this.$store.getters.minProductPrice || this.priceRange.maxPrice != this.$store.getters.maxProductPrice) {
      //   this.$store.dispatch('disableButton', true)
      // } 
      // console.log(this.$store.state.disabled, this.priceRange.minPrice)
      return this.$store.state.disabled 

    },
  },

  methods: {
    filterData() {
      const { category, priceRange, colors } = this
      this.$store.dispatch('filteredProducts', { category, priceRange, colors })
    },

    resetFilter() {
      
      // this.refresh = !this.refresh
      const { category, colors } = this
      this.$store.dispatch('clearFilter', { category, colors })
      this.search = ''
      this.colors = []
      this.category = {"t-shirt": false, cap: false, socks: false,}
      this.priceRange.minPrice = this.$store.getters.minProductPrice
      this.priceRange.maxPrice = this.$store.getters.maxProductPrice
      // console.log(this.priceRange)
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

.active-apply {
  background: rgb(0, 128, 0);
  color: #fff;
  
}
.active-apply:hover {
  background: rgb(0, 165, 0);
  color: #fff;
  box-shadow: 0px 0px 6px rgb(90, 90, 90);
}
.active-reset {
  background: rgb(223, 0, 0);
  color: #fff;
}

.active-reset:hover {
  background: rgb(255, 0, 0);
  color: #fff;
  box-shadow: 0px 0px 6px rgb(90, 90, 90);
}
</style>
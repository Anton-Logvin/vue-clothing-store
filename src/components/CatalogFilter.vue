<template>
  <form class="filter">
    <h3 class="filter__title">Фильтр продуктов</h3>
    <div class="filter__item category">
      <p class="filter__item-title">Категории товаров</p>
      <custom-checkbox class="filter__category"  v-model="category['t-shirt']" label="Майки" />
      <custom-checkbox  v-model="category.cap" label="Кeпки" />
      <custom-checkbox  v-model="category.socks" label="Носки" />
    </div>
    <div class="filter__item">
      <p class="filter__item-title">Выбрать по цене</p>
      <custom-price-filter :key="refresh" v-model="priceRange" />
    
    </div>
    
    <div class="filter__item">
      <p class="filter__item-title">Выбрать по цвету</p>
      <custom-colors-filter v-model="colors" />
    </div>
    <div class="filter__buttons filter__item">
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
    </div>
  </form>
</template>

<script>
import CustomButton from './form/CustomButton'
import CustomCheckbox from './form/CustomCheckbox'
import CustomColorsFilter from './form/CustomColorsFilter'
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
        minPrice: this.$store.getters.minProductPrice,
        maxPrice: this.$store.getters.maxProductPrice
      },
      colors: [],
    }
  },

  components: {
    CustomCheckbox,
    CustomPriceFilter,
    CustomColorsFilter,
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
      if(this.priceRange.minPrice != this.$store.getters.minProductPrice || this.priceRange.maxPrice != this.$store.getters.maxProductPrice) {
        this.$store.dispatch('disableButton', true)
      } 
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
    },
  },
}

</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
   
  &__title {
    color: rgb(0, 88, 0);
    padding-top: 50px;
  }

  &__item {
    width: 100%;
    padding: 20px 0px;
    border-top: 1px solid rgb(172, 172, 172);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 17px;
  }

  &__item-title {
    font-size: 17px;
    font-weight: 600;
  }

  &__category {
    color: rgb(16, 190, 10);
  }

  &__buttons {
    flex-direction: row;
    justify-content: space-around;
    gap: 14px;
  }
}

.category {
  padding-left: 30px;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  gap: 6px;
}

.filter__item-title {
  
}

.active-apply {
  background: rgb(0, 128, 0);
  color: #fff;
  // border: none;
}
.active-apply:hover {
  background: rgb(0, 165, 0);
  color: #fff;
  box-shadow: 0px 0px 6px rgb(90, 90, 90);
  
}
.active-reset {
  background: rgb(223, 0, 0);
  color: #fff;
  // border: none;
}

.active-reset:hover {
  background: rgb(255, 0, 0);
  color: #fff;
  box-shadow: 0px 0px 6px rgb(90, 90, 90);
}
</style>
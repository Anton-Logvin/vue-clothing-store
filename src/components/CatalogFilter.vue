<template>
  <!-- 
  TODO: 
    1. сделать компонент custom checkbox
    2. сделать компонент custom input
    3. сделать компонент цена
    4. сделать компонент цвет/группа цветов
    5. оформить фильтр на странице Каталог
    6. Заполнить фильтр данными
    7. Настроить работу фильтра 
  -->
  <div class="filter">
    <custom-input 
      @searchByTitle="searchTitleProductName"
    />
    <custom-checkbox 
      @changeCategories="changeCategories"
    />
    <custom-price-filter 
      @changePriceFilter="changePriceFilter"
    />
    <custom-colors-filter 
      @giveColorProductsToParent="changeColorProducts"
    />
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
            
    }
  },

  components: {
    CustomCheckbox,
    CustomPriceFilter,
    CustomColorsFilter,
    CustomInput,
  },
  computed: {
    
  },

  methods: {
    searchTitleProductName(searchTitle) {
      console.log(searchTitle)
      this.$emit('searchTitleProduct', searchTitle) 

    },
    changeCategories(changeCategories) {
      this.$emit('filterChangeCategories', changeCategories)
    },

    changePriceFilter(minPrice, maxPrice) {
      this.$emit('minMaxPriceFilter', minPrice, maxPrice)
    },

    changeColorProducts(changedColor) {
      this.$emit('changeColorProducts', changedColor)
    }
  }
}
</script>

<style lang="scss">
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}


</style>
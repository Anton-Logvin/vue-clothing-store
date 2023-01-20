<template>
  <div class="price-slider">
    <p>Min: {{ minPrice }}</p>
    <input 
      type="range" 
      min="0" 
      max="100" 
      step="5" 
      v-model.number="minPrice" 
      @change="setRangeSliders"
    >
    <input 
      type="range" 
      min="0" 
      max="100" 
      step="5" 
      v-model.number="maxPrice" 
      @change="setRangeSliders"
    >
    <p>Max: {{ maxPrice }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomPriceFilter',

  data() {
    return {
      minPrice: 0,
      maxPrice: 100,
    }
  },
  methods: {
    setRangeSliders() {
      if(this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.$emit('changePriceFilter', this.minPrice, this.maxPrice)
    },
  }
}
</script>

<style lang="scss" scoped>
  .price-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
    display: flex;
    gap: 16px;
  }

  .price-slider svg, .price-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]  {
    width: 200px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    border-radius: 10px/100%;
    height: 8px;
    border: 1px solid rgb(16, 95, 0);
    background-color: rgb(167, 167, 167);
  }
  
  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    margin-top: -5px;
  }
</style>
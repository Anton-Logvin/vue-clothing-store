<template>
  <div class="price-slider">
    <p class="price">Min: {{ price.minPrice }}</p>
    <input 
      type="range" 
      :min="min"
      :max="max" 
      step="1"
      v-model.number="price.minPrice" 
      @change="setRangeSliders"
    >

    <input 
      type="range" 
      :min="min"
      :max="max" 
      step="1" 
      v-model.number="price.maxPrice" 
      @change="setRangeSliders"
    >
    <p class="price">Max: {{ price.maxPrice }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomPriceFilter',

  props: {
    value: {
      type: Object,
      default: null,
    }
  },

  data() {
    return {
      price: this.value,
    }
  },

  computed: {
    min() {
      return this.$store.getters.minProductPrice
    },
    max() {
      return this.$store.getters.maxProductPrice
    }
  },

  watch: {
    min(val) {
      this.price.minPrice = val
    },

    max(val) {
      this.price.maxPrice = val
    },
  },

  methods: {
    setRangeSliders() {
      if(this.price.minPrice > this.price.maxPrice) {
        let tmp = this.price.maxPrice
        this.price.maxPrice = this.price.minPrice
        this.price.minPrice = tmp
      }
    },
  },
}

</script>

<style lang="scss" scoped>

  .price {
    width: 100%;
    font-weight: 600;
    color: rgb(92, 92, 92);
  }
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
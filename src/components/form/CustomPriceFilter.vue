<template>
  <div class="price-slider">
    <p>Min: {{ minPrice }}</p>
    <input 
      type="range" 
      :min="min"
      :max="max" 
      step="1"
      v-model.number="minPrice" 
      @change="setRangeSliders"
    >

    <input 
      type="range" 
      :min="min"
      :max="max" 
      step="1" 
      v-model.number="maxPrice" 
      @change="setRangeSliders"
    >
    <p>Max: {{ maxPrice }}</p>
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
      //?????????
      minPrice: this.$store.getters.minProductPrice,
      maxPrice: this.$store.getters.maxProductPrice,
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
      this.minPrice = val
    },

    max(val) {
      this.maxPrice = val
    },
  },

  methods: {
    setRangeSliders() {
      
      if(this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
        
      }
      this.$emit('input', {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      })

      //disabled
      // if(this.minPrice != this.$store.getters.minProductPrice || this.maxPrice != this.$store.getters.maxProductPrice) {
      //   this.$store.dispatch('disableButton', true)
      // } else { 
      //   this.$store.state.disabled = false
      // }
      // console.log(this.$store.state.disabled)
    },
  },
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
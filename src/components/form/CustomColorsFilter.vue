<template>
  <div>
    <p>Change color</p>
    <div class="color">
      <label 
        v-for="(color, i) in getColorsProducts" 
        :key="i"
        class="color__item"
      >
        <input 
          class="color__checkbox" 
          type="checkbox"
          @change="giveColorProductsToParent(color)"
        >
        <span class="color__trigger"
          :style="{background: color}"
        ></span>
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CustomColorsFilter',
  data() {
    return {
      colors: [],
      changeColor: ''
    }
  },

  computed: {
    getColorsProducts() {
      return this.allColorsProducts()
    }
  },

  methods: {
    allColorsProducts() {
      let productsColors = []
      const allProducts = this.$store.getters['productList']
      productsColors.push(allProducts.map(item => item = item.colors))
      let colors = []
      colors.push(productsColors.flat(2))
      colors = new Set(colors[0])
      colors = Array.from(colors)
      this.colors = colors
      return colors
    },

    giveColorProductsToParent(changeColor) {
      this.$emit('giveColorProductsToParent', changeColor)
    }
  }
}

</script>

<style lang="scss" scoped>
.color {
    max-width: 250px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

  &__item {
    cursor: pointer;
    display: block;
  }
  
  &__trigger {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px rgb(73, 73, 73);
    border: 2px solid transparent;
  }

  &__checkbox {
    display: none;
    
    &:checked {
      & + .color__trigger{
        border-color: #cb11ab;
      }
    }
  }
}
</style>
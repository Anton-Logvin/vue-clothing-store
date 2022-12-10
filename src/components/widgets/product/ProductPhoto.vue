<template>
  <div class="product-view">
    
    <div class="product-view__image">
      <img :src="imageSrc" />
    </div>
    <div class="product-view__color-box">
    <div 
      class="product-view__color-box-item" 
      v-for="(color, index) in ProductColor" 
      :key="index"
      :style="`background: ${color}`" 
      @mouseover="updateProduct(index)"
    />
   
  </div>  
  </div>  
</template>

<script>
export default {
  name: "ProductPhoto",

  props: ['ImageProduct','ProductColor'],

  data() {
    return {
      selectedProduct: 0
    }
  },

  computed: {
    imageSrc() {
      return this.ImageProduct[this.selectedProduct];
    }
  },

  methods: {
    updateProduct(index) {
      this.selectedProduct = index
    },
  }
}
</script>

<style lang="scss" scoped>
img {
    border: 1px solid #d8d8d8;
    max-width: 350px;
    box-shadow: 0px 2px 5px rgb(204, 204, 204);
    border-radius: 10px;
}
.product-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &__color-box {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 5px;
  }

  &__color-box-item {
    width: 50px;
    height: 10px;
    margin: 5px;
    background: red;
    border-radius: 3px;
    box-shadow:  0px 0px 4px rgb(128, 128, 128);
  }

  &__color-box-item:hover {
    box-shadow: 0px 0px 8px rgb(59, 59, 59);
  }
}
</style>
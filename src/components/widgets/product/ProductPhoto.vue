<template>
  <div class="product-window">
    
    <div class="product-image">
      <img :src="imageSrc" />
    </div>
    <div class="color-box">
    <div 
      class="color-box__item" 
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

<style scoped>
  img {
    border: 1px solid #d8d8d8;
    max-width: 350px;
    box-shadow: 0px 2px 5px rgb(204, 204, 204);
    border-radius: 10px;
}
.product-window {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}

.color-box {
    display: flex;
    justify-content: center;
    width: 100%;
}

.color-box__item {
    width: 40px;
    height: 40px;
    margin: 5px;
    background: red;
    border-radius: 4px;
    box-shadow:  0px 0px 4px rgb(128, 128, 128);
}

.color-box__item:hover {
    box-shadow: 0px 0px 8px rgb(59, 59, 59);
}
</style>
<template>
  <div class="color-box">
    <div 
      class="color-box__item" 
      v-for="(color, index) in ProductColor" 
      :key="index"
      :style="`background: ${color}`" 
      @mouseover="updateProduct(index)"
    />
   
  </div>  
</template>

<script>

export default {
  data() {
    return {
      selProd: this.selectedProduct,
    }
  },
  props: ['ProductColor','selectedProduct']
,
methods: {
  updateProduct(index) {
    // console.log(this.selProd)
    
    this.$emit('updateProduct',this.selProd = index)
  
  },
  // selProdImage() {
  //   this.$emit(updateProduct)
  // }
 
}
  
}
</script>

<style scoped>
.color-box {
    display: flex;
}

.color-box__item {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    margin-right: 5px;
    background: red;

}

.color-box__item:hover {
    box-shadow: 0px 0px 5px red;
}

</style>
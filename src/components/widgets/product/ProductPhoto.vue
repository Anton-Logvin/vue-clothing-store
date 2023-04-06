<template>
  <div class="product-view">
    <div class="product-view__image">
      <img :src="imageSrc" />
    </div>
    <div class="product-view__color-box">
      <p class="product-view__color-choice">Color:</p>
      <custom-radio-group
        v-model="selectedColor" 
        :items="ProductColor" 
        @getIndexPhoto="updateProduct"
      />
    </div>  
  </div>  
</template>

<script>
// import { eventBus } from '@/main'
import CustomRadioGroup from '@/components/form/CustomRadioGroup'

export default {
  name: "ProductPhoto",

  props: ['ImageProduct','ProductColor'],

  components: { CustomRadioGroup },

  data() {
    return {
      selectedProduct: 0,
      selectedColor: this.ProductColor[0],
    }
  },

  computed: {
    imageSrc() {
      return this.ImageProduct[this.selectedProduct];
    }
  },

  methods: {
    updateProduct(getIndexPhoto) {
      this.selectedProduct = getIndexPhoto
      return this.$store.dispatch('cartModule/cartIndexImageProduct', this.selectedProduct)
    },
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 300px;
}

.product-view {
  display: flex;
  gap: 10px;

  &__color-choice {
    font-size: 20px;
  }

  &__color-box {
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    padding-top: 3em;
  }
}

@media(max-width: 994px) {
  .product-view {
    flex-direction: column;

    &__color-box {
      flex-direction: row;
      justify-content: center;
      // align-items: end;
      padding-top: 0px;
      gap: 10px;
    }
  }
}

@media(max-width: 770px) {
  img {
    max-width: 200px;
  }
}
</style>
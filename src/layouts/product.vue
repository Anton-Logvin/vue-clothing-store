<template>
  <div v-if="product" class="container">
    <h2>{{ product.title }}</h2>
    <div class="page">
      <div class="page-discription">
        <div>{{ product.title }}</div>
        <div>Product id: {{ product.id }}</div> 
        <div>Shipping: {{ product.shipping }}</div>
        <button>Cart</button>
    </div>
    <div 
      v-for="(image, index) in product.images" 
      :key="index"
    >
      <img :src="image" />
    </div>
  </div>
</div>
<span v-else>
  Нет информации по товару
</span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  
  data() {
    return {
      productId: +this.$route.params.id,
    }
  },

  computed: {
    ...mapGetters(['productList']),
    product() {
      return this.productList.find(item => item.id === this.productId)
    },
  },

  methods: {
    ...mapActions(['getProducts']),
  },

  mounted() {
    if(!this.productList.length) {
      this.getProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30px;
  display: flex;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 6px gray;
}
.page-discription {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 20%;
}
img {
  max-width: 400px;
  width: 100%;
}
</style>
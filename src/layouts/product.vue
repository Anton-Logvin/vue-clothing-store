<template>
  <div class="container">
    <h2>{{ productTitle }}</h2>
    <div class="page">
      <div class="page-discription">
        <div>{{ productTitle }}</div>
        <div>Product id: {{ productId }}</div> 
        <div>Shipping: {{ productShipping }}</div>
        <button >Cart</button>
    </div>
    <div 
      v-for="(image, index) in productImage" 
      :key="index"
    >
      <img :src="image" />
    </div>
  </div>
</div>
</template>

<script>
// import {mapGetters} from 'vuex';
export default {
  name: 'ProductPage',
  
  data() {
    return {
      productId: this.$route.params.product.id,
      productTitle: this.$route.params.product.title,
      productImage: this.$route.params.product.images,
      productShipping: this.$route.params.product.shipping
    }
  },
  computed: {
  
    // ...mapGetters(['productItem'])
  },
  methods: {

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
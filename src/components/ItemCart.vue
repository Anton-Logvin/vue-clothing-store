<template>
  <div class="item-cart container">
    <div class="item-cart__product" v-for="(product, i) in cart" :key="i" :product="product">
      <div class="item-cart__image">
        <div 
          v-for="(image, index) in product.images" 
          :key="index"
        >
          <img :src="image" />
        </div>
      </div>
      <div class="product-description">
        <h4>{{ product.title }}</h4>
        <p></p>
        <span>id: {{ product.id }} Quantity: {{ product.quantity }}</span>
        <div>Shipping: {{ product.shipping }}</div>
        <p class="item-cart__price">$ {{ product.price }} </p>
        <b-button variant="success">
          Delete
        </b-button>
      </div>
    </div>
    <!-- <div
      :PriceCart="PriceCart"
    ></div>
    Order: {{ PriceCart }} -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProductPage',
  props: [],
  computed: {
    ...mapGetters(['cart', 'productList', ]),
  },
  methods: {
    // ...mapActions(['getProducts']),

  //   PriceCart() {
    
  //     let order = 0
      
  //     console.log(order)
  //     return order
  // },

  // mounted() {
  //   if (!this.toCart.length) {
  //     this.Cart
  //   }
  // },
}
}
</script>

<style lang="scss" scoped>
.item-cart {

  &__product {
    display: flex;
    max-width: 80%;
    margin: 0 auto;
    border: 2px solid rgb(190, 190, 190);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 6px gray;
    justify-content: space-around;
    padding-top: 20px;
  }

  &__image {
    display: flex;
  }

  &__image img {
    max-width: 200px;
  }
  &__price {
    color: rgb(255, 0, 0);
    font-size: 20px;
    padding-top: 30px;
  }
}
</style>

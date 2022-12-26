<template>
  <div class="item-cart container">
    <div class="item-cart__product">
      <div class="item-cart__image">
        <div 
          v-for="(image, index) in cart_item_data.images" 
          :key="index"
        >
          <img :src="image" />
        </div>
      </div>
      <div class="product-description">
        <h4>{{ cart_item_data.title }}</h4>
        <span>
          Quantity: 
          <span class="item-cart__amount" @click="decrementItem">-</span>
          {{ amountQuantity }}
          <span class="item-cart__amount" @click="incrementItem">+</span>
          <p>in stock:{{ cart_item_data.quantity }}</p> 
        </span>
        <div>Shipping: {{ cart_item_data.shipping }}</div>
        <p class="item-cart__price">$ {{ sumQuantity }} </p>
        <b-button 
          variant="success"
          @click="deleteFromCart"
        >
          Delete
        </b-button>
        <!-- <b-button 
          variant="success"
          @click="IndexImageProduct"
        >
          image Index
        </b-button> -->
      </div>
    </div>
  </div>
</template>

<script>

// import { eventBus } from '../main'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ItemCart',
  data() {
    return {
      amountQuantity: 1,
      summProduct: 0
    }
  },
  props: {
    cart_item_data: {
      type: Object,
      default: null
    }
  },

  computed: {
    // ...mapMutations(['IndexImageProduct']),
    // ...mapGetters(['indexImageGetter']),

    sumQuantity() {
      // let quantity = this.amountQuantity
      let sumQuantity = this.cart_item_data.price * this.amountQuantity
      this.$emit('totalSumQuantity', sumQuantity)
      return sumQuantity
    },

    //   indexImageFromCart() {
    //   console.log(this.$store.state.indexImage)
    //   return this.$store.actions.getIndexImageProduct
    // }
  },

  // created() {
  //   eventBus.$on('indexImageCart', this.selectedProduct)
  //   console.log(this.selectedProduct)
  // },

  methods: {
    ...mapGetters(['indexImageGetter']),

    // imgIndexCart() {
    //   console.log(this.$store.getters['indexImageGetter'])
    //   return this.$store.getters['indexImageGetter']
    // },

    ...mapActions([
      'incrementCartItem', 
      'decrementCartItem', 
      'removeProductFromCart'
    ]),

    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
  
    decrementItem() {
      this.amountQuantity--
      this.$emit('getAmountQuantity', this.amountQuantity)
      if (this.amountQuantity < 1) return this.amountQuantity = 1
      
    },

    incrementItem() {
      this.amountQuantity++
      this.$emit('getAmountQuantity', this.amountQuantity)
      if (this.amountQuantity > this.cart_item_data.quantity) {
        alert('Больше товара нет в наличии')
        return this.amountQuantity = this.cart_item_data.quantity
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.item-cart {
  // margin-bottom: 96px;

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
  &__amount {
    padding: 4px;
  }
  &__amount:hover {
    cursor: pointer;
  }
  &__price {
    color: rgb(255, 0, 0);
    font-size: 20px;
    padding-top: 30px;
  }
}
</style>

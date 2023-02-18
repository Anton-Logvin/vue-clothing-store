<template>
  <div class="item-cart container">
    <div class="item-cart__product">
      <div class="item-cart__image">
        <img :src="cart_item_data.images[this.$store.state.indexImage]">
      </div>
      <div class="item-cart__description">
        <h4 class="item-cart__title">{{ cart_item_data.title }}</h4>
        <div class="item-cart__sub-title">
          <div>
            <span>
              Quantity: <br />
              <span class="item-cart__amount" @click="decrementItem">-</span>
                {{ cart_item_data.quantityInCart }}
              <span class="item-cart__amount" @click="incrementItem">+</span>
              <p>in stock: {{ cart_item_data.quantity }}</p>
            </span>
          </div>
          <div>Shipping: {{ cart_item_data.shipping }}
            <div class="item-cart__color">Color: <div class="item-cart__color-item" :style="`background: ${cart_item_data.colors[this.$store.state.indexImage]}`"></div> </div>
          </div>
          
          <div>
            <p class="item-cart__price">$ {{ sumQuantity }} </p>
            <b-button variant="success" @click="deleteFromCart">
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'ItemCart',
  data() {
    return {}
  },
  props: {
    cart_item_data: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapGetters(['']),

    sumQuantity() {
      let sumQuantity = this.cart_item_data.price * this.cart_item_data.quantityInCart
      this.$emit('totalSumQuantity', sumQuantity)
      return sumQuantity
    },

    imgIndexCart() {
      console.log(this.$store.state.indexImage)
      return this.$store.getters['getIndexImageProduct']
    },
  },

  methods: {
    ...mapGetters(['indexImageGetter', 'getIndexImageProduct']),

    deleteFromCart() {
      this.$emit('deleteFromCart')
    },

    decrementItem() {
      this.$emit('decrement')
    },

    incrementItem() {
      this.$emit('increment')
    },
  },
}
</script>

<style lang="scss" scoped>
.item-cart {
  // margin-bottom: 96px;

  &__product {
    display: flex;
    max-width: 80%;
    margin: 0 auto;
    border: 2px solid rgb(212, 212, 212);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 8px rgb(197, 197, 197);
  }

  &__image {
    display: flex;
  }

  &__image img {
    max-width: 200px;
  }

  &__description {
    flex-grow: 1;
    position: relative;
  }

  &__title {
    position: absolute;
  }

  &__sub-title {
    padding-top: 3em;
    display: flex;
    justify-content: space-around;
  }

  &__amount {
    padding: 4px;
  }

  &__amount:hover {
    cursor: pointer;
  }

  &__color {
    display: flex;
    gap: 10px;
  } 

  &__color-item {
    height: 12px;
    width: 26px;
    margin-top: 7px;
    border-radius: 2px;
  }

  &__price {
    color: rgb(255, 0, 0);
    font-size: 20px;
    padding-top: 30px;
  }
}
</style>

<template>
  <div class="custom">
    <span>Количество: <br/> </span>
    <div class="custom__quantity">
      <span class="custom__amount" @click="decrement">-</span>
      <span class="custom__quantity-number">{{ product.quantityInCart || quantity }}</span> 
      <span class="custom__amount" @click="increment">+</span>
    </div>
    <p>Доступно: {{ availableQuantity }}</p>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CustomQuantity',

  props: {
    product: {
      type: Object,
      default: null
    },
    quantity: {
      type: Number,
      default: 1
    }

  },

  computed: {
    ...mapGetters([]),

    availableQuantity() {
      return this.product.quantity - this.product.quantityInCart
    },
  },

  methods: {
    decrement() {
      this.$emit('decrement')
    },

    increment() {
      this.$emit('increment')
    },
  },
}

</script>
<style lang="scss" scoped>

  p {
    margin: 0;
  }

  .custom {
    &__quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__quantity-number {
    padding: 0px 10px;
  }

  &__amount {
    width: 20px;
    font-size: 20px;
    font-weight: 500;
    flex: 1 0 auto;
    background: rgb(230, 230, 230);
    transition: ease .3s;
  }

  &__amount:hover {
    cursor: pointer;
    box-shadow: 0px 0px 2px grey;
  }
  }
</style>
<template>
  <div class="cart">
    <checkout-order-pop-up 
      class="cart__modal-order"
      v-if="modalOrderVisible"
      :modalOrderVisible="modalOrderVisible"
      @closeModaltoClick="modalOrderClick"
    />
    <h2>CART page</h2>
    <custom-button 
      :title="buttonCheckoutOrder" 
      :class="{ disabledButton: !disabledOrder }"
      @click="modalOrderClick"
      class="cart__button-order"
    />
    <item-cart
      v-for="(item, index) in cart"
      :key="item.id"
      :cart_item_data="item"
      @deleteFromCart="deleteProductFromCart(item.id)"  
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
  
    <div class="cart-total">
      <p class="total__name">Total: </p>
      <p>$ {{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import ItemCart from '@/layouts/ItemCart'
import CustomButton from '@/components/form/CustomButton'
import CheckoutOrderPopUp from './CheckoutOrderPopUp'

export default {
  name: 'cart_data',
  data() {
    return {
      buttonCheckoutOrder: 'Оформить заказ',
      modalOrderVisible: false
    }
  },
  components: { 
    ItemCart,
    CustomButton,
    CheckoutOrderPopUp, 
  },
  
  computed: {
    ...mapGetters(['cart', 'totalPrice',]),

    disabledOrder() {
      return this.$store.getters.cartLength
    }
  },

  methods: {
    ...mapActions([
      'deleteProductFromCart',
      'incrementItemInCart', 
      'decrementItemInCart',
    ]),
    decrement(index) {
      this.decrementItemInCart(index)
    },

    increment(index) {
      this.incrementItemInCart(index) 
    },

    modalOrderClick() {
      this.modalOrderVisible = !this.modalOrderVisible
    }
  },

  mounted() {
    this.$store.dispatch('setCartFromStorage');
  }
}

</script>

<style lang="scss" scoped>
.cart {
  // margin-bottom: 96px;
  position: relative;
}

.cart__button-order {
  background: rgb(41, 148, 32);
  color: #fff;
}

.cart-total {
  display: flex;
  justify-content: center;
  background: rgb(0, 131, 0);
  padding: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  font-size: 20px;
  color: rgb(255, 255, 255);
}

.disabledButton {
  display: none;
}
.total__name {
  margin-right: 10px;
}
</style>
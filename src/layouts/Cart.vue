<template>
  <div class="cart">
    <checkout-order-pop-up 
      class="cart__modal-order"
      v-if="modalOrderVisible"
      :modalOrderVisible="modalOrderVisible"
      @closeModaltoClick="modalOrderClick"
    />
    <h3>Корзина товаров</h3>
  
    
    <div class="cart__items">
      <item-cart
      v-for="(item, index) in cart"
        :key="item.id"
        :product="item"
        @deleteFromCart="deleteProductFromCart(item.id)"  
        @increment="increment(index)"
        @decrement="decrement(index)"
      />
    </div>
    
    <div class="cart__footer container">
      <router-link class="cart__footer-link" to="/catalog"><b-icon icon="arrow-left" scale="1.1"></b-icon> Вернуться к покупкам</router-link>
      <div class="cart__total">
        <span class="cart__total-text">Общая стоимость: 
          <span class="cart__total-price">$ {{ totalPrice }}</span>
        </span>
        <custom-button 
          :title="buttonCheckoutOrder" 
          :class="{ disabledButton: !disabledOrder }"
          @click="modalOrderClick"
          class="cart__button-order"
        />
      </div>
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
      modalOrderVisible: false,
      showTopToModal: false,
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
      window.scrollTo(0,0);
    },

 
  },
  
  mounted() {
    this.$store.dispatch('setCartFromStorage');
  }
}

</script>

<style lang="scss" scoped>
.cart {
  &__button-order {
    background: rgb(41, 148, 32);
    color: #fff;
  }

  &__footer {
    padding: 20px 0px;
    // margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid rgb(212, 212, 212);
  }

  &__footer-link {
    text-decoration: none;
    font-size: 18px;
  }

  &__total {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__total-text {
    padding: 10px 0px;
  }

  &__total-price {
    font-weight: 600;
  }
}
.disabledButton {
  display: none;
}
.total__name {
  margin-right: 10px;
}

@media(max-width: 576px) {
  .cart {
    &__footer {
      flex-direction: column;
    }

    &__footer-link {
      padding: 14px;
    }
  }
}
</style>
<template>
  <div class="cart">
    <h2>CART page</h2>
    <item-cart
      v-for="item in cart"
      :key="item.id"
      :cart_item_data="item"
      @deleteFromCart="deleteProductFromCart(item.id)"  
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
export default {
  name: 'cart_data',

components: { ItemCart },
  
  computed: {
    ...mapGetters(['cart', 'totalPrice']),
  },

  methods: {
    ...mapActions(['deleteProductFromCart']),
  },

  mounted() {
    this.$store.dispatch('setCartFromStorage');
  }
}

</script>

<style lang="scss" scoped>
.cart {
  margin-bottom: 96px;
}
  .cart-total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    background: rgb(0, 131, 0);
    color: rgb(255, 255, 255);
    font-size: 20px;

  }
  .total__name {
    margin-right: 10px;
  }
</style>
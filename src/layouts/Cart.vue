<template>
  <div class="cart">
    <h2>CART page</h2>
    {{ totalCost }}
    <button @click="totalCost">totalCost</button>
    <item-cart
      v-for="(item, index) in cart"
      :key="item.id"
      :cart_item_data="item"
      @deleteFromCart="$store.dispatch('removeProductFromCart', index)"  
      @totalSumQuantity="totalCost"
    />
    <div class="cart-total">
      <p class="total__name">Total: </p>
      <p>$ {{ cartTotalCost }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemCart from '@/layouts/ItemCart'
export default {
  name: 'cart_data',
  data() {
    return {
      // sumQuantity: 0,
      arr: [],
    }
  },
  components: { ItemCart },
  props: {
  
  },
  
  computed: {
    ...mapGetters(['cart']),
    ...mapActions(['removeProductFromCart']),

    cartTotalCost() {
      let result = []
      
      for (let item of this.cart) {
        result.push(item.price)
      }
        result = result.reduce((sum, el) => sum + el)  
        // console.log(result)
      return result
    },
  },
  
  methods: {
    totalCost(sumQuantity) {
        console.log(sumQuantity)
      // return sumQuantity
    },
  },
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
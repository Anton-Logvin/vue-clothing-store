<template>
  <div>
    <!-- {{ product.price }} -->
    <h2>CART page</h2>
    <item-cart/>
    
  </div>

</template>


<script>
import ItemCart from '@/components/ItemCart'
import { mapGetters } from 'vuex';
export default {
  name: 'vCart',
  data() {
    return {
      
    }
  },
  components: {
    ItemCart
  },
  computed: {
    ...mapGetters(['Cart', 'productList']),
    toCart() {
      return this.Cart
    }
    
  },
  // methods: {
  //   ...mapActions(['getProducts']),
  //   PriceCart() {
  //   this.toCart.filter(price =>)
  //   }
  // },
  
}

</script>
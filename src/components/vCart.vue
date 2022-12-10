<template>
  <div>
    <!-- {{ product.price }} -->
    <h2>CART page</h2>
    <item-cart/>
    
  </div>

</template>


<script>
import ItemCart from '@/components/ItemCart'
export default {
  name: 'vCart',
  data() {
    return {
      
    }
  },
  components: { ItemCart },
  // methods: {
  //   ...mapActions(['getProducts']),
  //   PriceCart() {
  //   this.toCart.filter(price =>)
  //   }
  // },
  
}

</script>
<template>
  <div>
    <h2>CART page</h2>
    <ItemCart/>
  </div>

</template>


<script>
import ItemCart from '@/components/ItemCart'
import { mapGetters } from 'vuex';
export default {
  name: 'vCart',
  components: {
    ItemCart
  },
  computed: {
    ...mapGetters(['Cart'])
      
    
  }
}

</script>
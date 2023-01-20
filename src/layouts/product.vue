<template>
<div v-if="product" class="container">
  <div class="product">
    <product-photo 
      :ImageProduct="product.images" 
      :ProductColor="product.colors" 
    />
    <h3 class="product__title">{{ product.title }}</h3>
    <div class="product__discription">
      
      <div class="product__discription-colum">
        <div>
          <p>
            Quantity: {{ product.quantity }}
          </p>
          <p>
            Shipping: {{ product.shipping }}
          </p>
        </div>

        <div class="product__availability">
          <p class="product__stock" :class="{ 'product__out-of-stock': !inStock }">
            Stock: {{ inStock ? 'In stock' : 'Out of Stock' }}
          </p>
          <div :style="!isSale ? `color: red`: ''">
            On sale: {{ isSale ? 'on sale' : 'not on sale' }}
          </div>
        </div>
      </div>

      <div class="product__buy">
        <span class="product__price">$ {{ product.price }} </span>
        <b-button variant="success" @click="addToCart">
          Add to Cart
        </b-button>
      </div>
    </div>
    <!-- <div 
      v-for="(image, index) in product.images" 
      :key="index"
    >
      <img :src="image" />
    </div> -->

  </div>
</div>
<span v-else>
  Нет информации по товару
</span>
</template>

<script>
import ProductPhoto from '@/components/widgets/product/ProductPhoto.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { ProductPhoto },
  name: 'ProductPage',

  data() {
    return {
      productId: +this.$route.params.id,
    }
  },

  computed: {
    ...mapGetters(['productList', 'Cart', ]),
    product() {
      return this.productList.find(item => item.id === this.productId)
    },

    inStock() {
      return this.product.availability
    },
    isSale() {
      return this.product.isSale
    },

  },

  methods: {
    ...mapActions(['getProducts']),

    addToCart() {
      return this.$store.dispatch('addProductToCart', this.product)
    }
  },

  mounted() {
    if (!this.productList.length) {
      this.getProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 2px solid #ccc;
  border-radius: 6px;
  box-shadow: 0px 0px 6px gray;
  max-width: 90%;
  margin: 0 auto;
  position: relative;

  &__title {
    position: absolute;
    left: 39%;
  }

  &__discription {
    display: flex;
    flex: 0 1 50%;
    justify-content: flex-end;
    padding-right: 2em;
    padding-top: 3em;
    font-size: 18px;
  }

  &__discription-colum {
    text-align: start;
  }

  &__buy {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 20px;
  }

  &__price {
    color: rgb(255, 0, 0);
    font-size: 22px;
    padding: 10px;
  }
}
</style>

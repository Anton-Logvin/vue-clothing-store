<template>
<div v-if="product">
  <div class="product">
    <product-photo 
      class="product__photo"
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
              
        <custom-quantity 
          class="product__custom-quantity"
          v-if="productInCart" 
          :product="productInCart" 
          @decrement="decrement"
          @increment="increment"
        />

      </div>
      <div class="product__buy">
        <span class="product__price">$ {{ product.price }} </span>
        <b-button
          v-if="!productInCart" 
          variant="success" 
          @click="addToCart">
            В корзину
        </b-button>
        <b-button
          v-else
          variant="success" 
          :disabled="true"
          @click="addToCart">
            В корзинe
        </b-button>
      </div>
    </div>
  </div>
  <router-link class="product__return-catalog" to="/catalog"><b-icon icon="arrow-left" scale="1.1"></b-icon> Вернуться к покупкам</router-link>
</div>
<span v-else>
  Нет информации по товару
</span>

</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import ProductPhoto from '@/components/widgets/product/ProductPhoto';
import CustomQuantity from '@/components/form/CustomQuantity';

export default {
  components: { ProductPhoto, CustomQuantity },
  name: 'ProductPage',

  data() {
    return {
      productId: +this.$route.params.id,
      quantityInCart: 1
    }
  },

  computed: {
    ...mapGetters(['productList',]),
    ...mapGetters('cartModule', ['cart',]),
    product() {
      return this.productList.find(item => item.id === this.productId)
    },

    productInCart() {
      return this.$store.getters['cartModule/cart'].find(item => item.id === this.productId) 
    },

    indexProductInCart() {
      return this.$store.getters['cartModule/cart'].findIndex(item => item.id === this.productId) 
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
      if(this.productInCart) {
        this.btnText = "В корзине"
        this.isDisabled = true
      }
      this.$store.dispatch('cartModule/addProductToCart', this.product)
    },

    decrement() {
      this.$store.dispatch('cartModule/decrementItemInCart', this.indexProductInCart)     
    },

    increment() {
      this.$store.dispatch('cartModule/incrementItemInCart', this.indexProductInCart)     
    },
  },

  mounted() {
    if (!this.productList.length) {
      this.getProducts()
    }
    // this.$store.dispatch('cartModule/setCartFromStorage');
  }
}
</script>

<style lang="scss" scoped>
.product {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 2px solid #ccc;
  border-radius: 16px;
  box-shadow: 0px 0px 10px rgb(148, 148, 148);
  max-width: 1240px;
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

  &__custom-quantity {
    text-align: center;
    padding: 6px 18px;
    border: 1px solid rgb(160, 160, 160);
    border-radius: 6px;
  }
  
  &__in-cart {
    text-align: center;
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

  &__return-catalog {
    text-decoration: none;
    font-size: 18px;
    padding: 20px 0px;
  }
}

@media(max-width: 1240px) {
  .product {
    max-width: 90%;
  }
}
@media(max-width: 992px) {
  .product {
    // flex-wrap: wrap;

    &__discription {
      padding-right: 0px;
    }
  }
}

@media(max-width: 612px) {
  .product {
    // flex-wrap: wrap;

    &__discription {
      display: flex;
      flex-direction: column;
    }
  }
}

@media(max-width: 460px) {
  .product {
    flex-direction: column;

    &__title {
      top: 4px;
      left: 10px;
    }

    &__photo {
      padding-top: 10px;
    }

    &__discription {
      padding-top: 20px;
    }

    &__discription-colum {
    flex-direction: row;
  }
   
  }
}
</style>

<!-- <template>
  <div class="product">
    <product-photo :ImageProduct="product.images" :ProductColor="product.colors" />
    <div class="product__info">
      <span class="product__title">{{ product.title }}</span>
      <p>
        <span>
          Quantity: {{ product.quantity }}
        </span>
        / Shipping: {{ product.shipping }}
      </p>
      <div class="product__availability">
        <p class="product__stock" :class="{ 'product__out-of-stock': !inStock }">
          {{ inStock ? 'In stock' : 'Out of Stock' }}
        </p>
        <div :style="!isSale ? `color: red`: ''">
          {{ isSale ? 'on sale' : 'not on sale' }}
        </div>
      </div>
      <button 
        @click.prevent.stop="addToCart" 
        :disabled="!inStock" 
        :class="{ disabledButton: !inStock }">
        Add to cart
      </button>
      <span class="product__price">$ {{ product.price }} </span>
    </div>
  </div>
</template>

<script>
import ProductPhoto from './ProductPhoto'

export default {
  components: {
    ProductPhoto,
  },

  props: {
    product: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      cartItem: 0,
    }
  },

  methods: {
    addToCart() {
      return this.$store.dispatch('addProductToCart', this.product)
    }
  },

  computed: {
    inStock() {
      return this.product.availability
    },
    isSale() {
      return this.product.isSale
    },

  }
}
</script> -->

<style lang="scss" scoped>
// body {
//   font-family: tahoma;
//   color: #282828;
//   margin: 0px;
// }

// .nav-bar {
//   background: linear-gradient(-90deg, #84CF6A, #16C0B0);
//   height: 60px;
//   margin-bottom: 15px;
// }

.product {
  flex-flow: wrap;
  padding: 1rem;


  &__title {
    font-size: 22px;
    color: #008512;
  }

  &__availability {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  &__price {
    color: rgb(255, 0, 0);
    font-size: 20px;
    padding-left: 10px;
  }

// .product-btn {
//   margin-top: 0px;
// }

// .color-box {
//   display: flex;
//   justify-content: center;
// }

// .cart {
//   margin-right: 30px;
//   margin-top: 12px;
//   border: 1px solid #d8d8d8;
//   padding: 5px 10px;
// }



// .review-form {
//   width: 400px;
//   padding: 20px;
//   margin: 40px;
//   border: 1px solid #d8d8d8;
// }

// input {
//   width: 100%;
//   height: 25px;
//   margin-bottom: 20px;
// }

// textarea {
//   width: 100%;
//   height: 60px;
// }

// .tab {
//   margin-left: 20px;
//   cursor: pointer;
// }



  &__out-of-stock {
    text-decoration: line-through;
  }
}

button {
  margin-right: 5px;
  border: none;
  background-color: #00a0159c;
  color: white;
  height: 40px;
  width: 100px;
  font-size: 14px;
  transition: .3s ease;
  border-radius: 4px;
}

button:hover {
  background: #00a015;
  box-shadow: 0px 0px 5px rgb(121, 121, 121);
}

.disabledButton {
  background-color: #b4b4b4;
}

.disabledButton:hover {
  background: #b4b4b4;
}

.disabledButton:hover {
  box-shadow: none;
}
.activeTab {
  color: #16C0B0;
  text-decoration: underline;
}
</style>

<template>
  <div class="product">
    <product-photo 
      :ImageProduct="product.images" 
      :ProductColor="product.colors" 
    />
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
</script>

<style lang="scss" scoped>
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

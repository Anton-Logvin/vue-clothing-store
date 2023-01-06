<template>
  <div class="product">
    <img 
      class="product__image"
      :src="product.images[0]" 
    />
    
    <div class="product__info">
      <span class="product__title">{{ product.title }}</span>
      <div class="product__buy">
        <button 
          @click.prevent.stop="addToCart" 
          :disabled="!inStock" 
          :class="{ disabledButton: !inStock }">
          Add to cart
        </button>
        <span class="product__price">$ {{ product.price }} </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
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

  &__image {
    border: 1px solid #d8d8d8;
    max-width: 350px;
    box-shadow: 0px 2px 5px rgb(204, 204, 204);
    border-radius: 10px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    
  }

  &__title {
    font-size: 22px;
    color: #008512;
    padding: 6px;
  }

  // &__availability {
  //   display: flex;
  //   justify-content: center;
  //   gap: 20px;
  // }

  &__price {
    color: rgb(255, 0, 0);
    font-size: 20px;
    padding-left: 10px;
  }

  // &__out-of-stock {
  //   text-decoration: line-through;
  // }
}

button {
  border: none;
  background-color: #00a0159c;
  color: white;
  height: 36px;
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

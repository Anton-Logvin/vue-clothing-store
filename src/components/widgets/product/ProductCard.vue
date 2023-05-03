<template>
  <div class="product">
    <img 
      class="product__image"
      :src="product.images[0]" 
    />
    <span class="product__title">{{ product.title }}</span>
    <div class="product__info">
      <div class="product__text">
        <span class="product__price">$ {{ product.price }} </span>
      </div>
      <div class="product__btn">
        <b-button
          v-if="!productInCart" 
          @click.prevent.stop="addToCart" 
        >
            В корзину!!
        </b-button>
        <b-button
          v-else
          :disabled="true"
          @click="addToCart">
            В корзинe
        </b-button>
      </div>
    </div>
    <toasted-message />
  </div>
</template>

<script>
import ToastedMessage from '@/components/ToastedMessage'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  components: {
    ToastedMessage
  },

  props: {
    product: {
      type: Object,
      default: null
    },
  },

  data() {
    return {
      cartItem: 0,
    }
  },

  computed: {
    ...mapGetters('productsFb', ['productList']),
    ...mapGetters('cartModule', ['cart']),

    inStock() {
      return this.product.availability
    },
    isSale() {
      return this.product.isSale
    },
    indexProductInCart() {
      return this.cart.findIndex(item => item.id == this.productId) 
    },

    productInCart(state) {
      return state.cart.find(item => item.id == this.product.id) 
    },
  },

  methods: {
    ...mapActions('cartModule', ['addProductToCart']),

    addToCart() {
      this.$toasted.show("Товар добавлен в корзину")
      return this.addProductToCart(this.product)
    }
  },
}
</script>

<style lang="scss" scoped>
.product:hover {
  box-shadow: 0px 0px 10px rgb(204, 204, 204);
  color: rgb(255, 153, 0);
}
.product {
  flex-flow: wrap;
  padding: 1em;
  margin: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  transition: .3s ease;

  &__image {
    max-width: 340px;
    width: 100%;
    height: auto;
  }

  &__info {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items:end
  }

  &__title {
    display: block;
    font-size: 20px;
    color: #222222;
    padding: 8px 0px 0px 0px;
    text-align: start;
  }

  &__price {
    display: block;
    font-weight: 600;
    font-size: 20px;
    // padding: 10px 0px
  }

  &__price:hover {
    // color: rgb(255, 115, 0);
  }
}

button {
  border: none;
  background-color: #00a0159c;
  color: white;
  padding: 8px 20px;
  transition: .3s ease;
  border-radius: 6px;
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

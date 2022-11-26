<template>
<div class="product">

  <ProductPhoto :ImageProduct="product.images" :ProductColor="product.colors" />
  <div class="product-info">
    <span class="product-title">{{ product.title }}</span>
    <p>Shipping: {{ product.shipping }}</p>

    <div class="product-availability">
      <p class="product-stock" :class="{ 'out-of-stock': !inStock }">
        {{ inStock ? 'In stock' : 'Out of Stock' }}
      </p>

      <div :style="!isSale ? `color: red`: ''">
        {{ isSale ? 'on sale' : 'not on sale' }}
      </div>
    </div>

    <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
      Add to cart
    </button>
    <button @click="minToCart">delete to cart</button>

  </div>
  <div class="cart">
    <p>Cart({{ cartItem }})</p>
  </div>
</div>
</template>

<script>
import ProductPhoto from './ProductPhoto'
// import ProdColorBox from './ProdColorBox'
export default {
  components: {
    ProductPhoto,
    // ProdColorBox
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
      // selectedProduct: 0
    }
  },
  methods: {
    addToCart() {
      this.cartItem += 1

    },
    minToCart() {
      this.cartItem -= 1
      if (this.cartItem < 0) {
        this.cartItem = 0
      }
    },

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

<style scoped>
body {
  font-family: tahoma;
  color: #282828;
  margin: 0px;
}

.nav-bar {
  background: linear-gradient(-90deg, #84CF6A, #16C0B0);
  height: 60px;
  margin-bottom: 15px;
}

.product {
  flex-flow: wrap;
  padding: 1rem;
}

.product-title {
  font-size: 22px;
  color: #008512;
}

.product-stock {
  /* margin: 2px; */

}

.product-availability {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.product-btn {
  margin-top: 0px;
}

.color-box {
  display: flex;
  justify-content: center;
}

.cart {
  margin-right: 30px;
  margin-top: 12px;
  border: 1px solid #d8d8d8;
  padding: 5px 10px;
}

button {
  /* margin-top: 30px; */
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

.review-form {
  width: 400px;
  padding: 20px;
  margin: 40px;
  border: 1px solid #d8d8d8;
}

input {
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 60px;
}

.tab {
  margin-left: 20px;
  cursor: pointer;
}

.activeTab {
  color: #16C0B0;
  text-decoration: underline;
}

.out-of-stock {
  text-decoration: line-through;
}
</style>

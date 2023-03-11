<template>
  <div class="item-cart container">
    <div class="item-cart__product">
      <div class="item-cart__image">
        <img :src="product.images[this.$store.state.indexImage]">
      </div>
      <div class="item-cart__description">
        <div class="item-cart__title">
          <h5>{{ product.title }}</h5>
          <b-icon 
            class="item-cart__icon"
            icon="x-lg" 
            scale="1.1" 
            variant="danger"
            @click="deleteFromCart"            
          ></b-icon>
        </div>
        <div class="item-cart__sub-title">
          <div>
            <span>Количество: <br /> </span>
            <div class="item-cart__quantity">
              <span class="item-cart__amount" @click="decrementItem">-</span>
                <span class="item-cart__quantity-number">{{ product.quantityInCart }}</span> 
              <span class="item-cart__amount" @click="incrementItem">+</span>
            </div>
              <p>Доступно: {{ product.quantity }}</p>
          </div>
          <div>Доставка: {{ product.shipping }}
            <div class="item-cart__color">Цвет: <div class="item-cart__color-item" :style="`background: ${product.colors[this.$store.state.indexImage]}`"></div> </div>
          </div>
          <div class="item-cart__price-wrapper">
            <p class="item-cart__price">$ {{ sumQuantity }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
 
  name: 'ItemCart',
  data() {
    return {
      buttonName: 'Удалить'
    }
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },

  computed: {
    ...mapGetters(['']),

    sumQuantity() {
      let sumQuantity = this.product.price * this.product.quantityInCart
      this.$emit('totalSumQuantity', sumQuantity)
      return sumQuantity
    },

    imgIndexCart() {
      console.log(this.$store.state.indexImage)
      return this.$store.getters['getIndexImageProduct']
    },
  },

  methods: {
    ...mapGetters(['indexImageGetter', 'getIndexImageProduct']),

    deleteFromCart() {
      this.$emit('deleteFromCart')
    },

    decrementItem() {
      this.$emit('decrement')
    },

    incrementItem() {
      this.$emit('increment')
    },
  },
}
</script>

<style lang="scss" scoped>
.item-cart {
  // margin-bottom: 96px;

  &__product {
    display: flex;
    border-top: 2px solid rgb(212, 212, 212);
    padding: 10px;
  }
  
  &__image {
    display: flex;
  }

  &__image img {
    max-width: 160px;
  }

  &__description {
    flex-grow: 1;
    position: relative;
  }

  &__title {
    color: green;
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
  }

  &__icon {
    opacity: 0.7;
  }

  &__icon:hover {
    opacity: 1;
  }

  &__button {
    border: 1px solid red;
    background: rgb(228, 98, 98);
    
  }

  &__button:hover {
    background: rgb(255, 56, 56);
  } 

  &__sub-title {
    padding-top: 3em;
    display: flex;
    justify-content: flex-end;
    gap: 3em;
    height: 100%;
  }

  &__quantity {
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
  }

  &__amount:hover {
    cursor: pointer;
  }

  &__color {
    display: flex;
    align-items: center;
    gap: 10px;
  } 

  &__color-item {
    height: 14px;
    width: 30px;
    border-radius: 2px;
    box-shadow: 0px 0px 2px gray;
  }

  &__price-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__price {
    color: green;
    font-size: 18px;
    min-width: 60px;
    border-radius: 2px;
  }
}
</style>

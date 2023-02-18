<template>
  <div class="popup-wrapper">
    <div class="popup">
      <div class="popup__header">
        <h4>Оформить заказ</h4>
      </div>
      <div class="popup__content">
        <span>ФИО</span>
        <custom-input 
          class="popup__input"
          :plaseHolder="plaseHolderName"
          v-model="name" 
        />
        <span>Адрес доставки</span>
        <custom-input
        class="popup__input" 
          :plaseHolder="plaseHolderAdress"
          v-model="adress" 
        />
        <span>Телефон</span>
        <custom-input
        class="popup__input" 
          :plaseHolder="plaseHolderTel"
          v-model="phone" 
        />
        
        <div
          class="popup__products"
          v-for="product in cart"
          :key="product.id"
          
        > 
        <span class="popup__products-title">{{ product.title }} </span>
        <span class="popup__products-price">$ {{ product.price }}</span>
        
      </div>
      <div class="popup__total-price"><span>Итого: </span>$ {{ totalPrice }}</div>
        
      </div>
      <div class="popup__footer">
        <custom-button class="popup__btn-order popup__btn" @click="addToOrderList" :title="checkoutOrder"/>
        <custom-button class="popup__btn-close popup__btn" @click="closeModaltoClick" :title="closePopUp"/>
      </div>
    </div>
  </div>
  
</template>

<script>
import CustomInput from '@/components/form/CustomInput'
import CustomButton from '@/components/form/CustomButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckoutOrderPopUp',
  components: { 
    CustomInput, 
    CustomButton 
  },
  
  props: {

  },
  data() {
    return {
      checkoutOrder: 'Оформить заказ',
      closePopUp: 'Закрыть',
      plaseHolderName: 'Введите имя',
      plaseHolderAdress: 'Введите адрес',
      plaseHolderTel: 'Телефон',
      name: '',
      adress: '',
      phone: '',
      

    }
  },
  computed: {
    ...mapGetters(['cart', 'totalPrice']),
  },

  methods: {
    closeModaltoClick() {
      this.$emit('closeModaltoClick')
    },

    addToOrderList() {
      
      const objOrder = {
        name: this.name,
        adress: this.adress,
        phone: this.phone,
        products: this.$store.getters.cart
      }
      this.$store.dispatch('addToOrderList', objOrder)
    }
  }
}
</script>
  
<style lang="scss" scoped>

.popup-wrapper {
  background: rgba(31, 46, 30, 0.336);
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  padding: 50px;  
}
  .popup {
    z-index: 100;
    width: 440px;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 10px #c9c9c9;
      
    &__header {
      padding: 10px;
      background: green;
      color: #fff;
      border-radius: 6px 6px 0px 0px;
    }

    &__content {
      padding: 10px;
    }

    &__input {
      padding: 0px 0px 16px 0px;
      
    }

    &__products {
      display: flex;
      justify-content: space-between;
      padding: 8px 20px;
      border: 1px solid #c9c9c9;
    }

    &__products-title {
      font-size: 18px;
    }

    &__products-price {
      color: red;
    }
    &__total-price {
      color: green;
      padding: 14px 0px 0px 0px;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding: 14px;
    }

    &__btn {
      color: #fff;
      transition: 0.3s ease;
    }

    &__btn:hover {
      box-shadow: 0px 0px 5px rgb(82, 81, 81);
    }
    &__btn-order {
      background: rgb(0, 145, 0);
    }

    &__btn-close {
      background: red;
    }
  }

</style>
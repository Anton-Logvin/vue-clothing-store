<template>
  <form class="popup-wrapper">
    <div class="popup">
      <div class="popup__header">
        <h4>Оформить заказ</h4>
        <b-icon 
          class="popup__icon"
          icon="x-lg" 
          scale="1.1" 
          @click="closeModaltoClick"
        ></b-icon>
      </div>
      <div class="popup__content">
        <div class="popup__inputs-block">
          <custom-input 
            class="popup__input"
            :placeholder="placeholderName"
            v-model.trim="$v.form.name.$model"
            :class="$v.form.name.$error ? 'is-invalid' : ''"
            fill
          />
          <p class="popup__text-error" v-if="$v.form.name.$dirty && !$v.form.name.required">Обязательное поле</p>
          <p class="popup__text-error" v-if="$v.form.name.$dirty && !$v.form.name.minLength">Слишком короткое имя</p>
          
          <custom-input
            class="popup__input" 
            :placeholder="placeholderAdress"
            v-model.trim="$v.form.adress.$model" 
            :class="$v.form.adress.$error ? 'is-invalid' : ''"
            fill
          />
          <p class="popup__text-error" v-if="$v.form.adress.$dirty && !$v.form.adress.required">Обязательное поле</p>
          
          <custom-input
            class="popup__input" 
            :placeholder="placeholderTel"
            v-model.trim="$v.form.phone.$model"
            width="300" 
          />
          <p class="popup__text-error" v-if="$v.form.phone.$dirty && !$v.form.phone.required">Обязательное поле</p> 
          <p class="popup__text-error" v-if="$v.form.phone.$dirty && !$v.form.phone.minLength">Номер слишком короткий</p>
          <p class="popup__text-error" v-if="$v.form.phone.$dirty && !$v.form.phone.maxLength">Номер слишком длинный</p>
          <!-- <p class="popup__text-error" v-if="$v.form.phone.$dirty && !$v.form.phone.number">Номер должен состоять из цифр</p>  -->
          <span class="popup__text-email">Введите email, есди хотите получать информацию об акциях и новых поступлениях товаров</span>
          <custom-input
            class="popup__input" 
            :placeholder="placeholderMail"
            v-model="$v.form.email.$model"
            :class="$v.form.email.$error ? 'is-invalid' : ''"
            fill
          />
          <p class="popup__text-error" v-if="$v.form.email.$dirty && !$v.form.email.email">Введите email корректно</p>
        </div>

        <span class="popup__number-order">Заказ №: {{ numberOrder }}</span>
        <div class="popup__order-header">
          <span>Название товара</span>
          <div class="popup__order-price-del">
            <span>Цена</span>
            <span>Удалить</span>
          </div>
        </div>
        <div
          class="popup__products"
          v-for="product in cart"
          :key="product.id"
        > 
        <span class="popup__product-title">{{ product.title }} </span>
        <div class="popup__product-group">
          <span class="popup__product-price">$ {{ product.price }}</span>
          <b-icon 
            class="popup__icon"
            icon="x-circle" 
            scale="1.3" 
            variant="danger"
            @click="deleteProduct(product.id)"
          ></b-icon>
        </div>
      </div>
          
      </div>
      <div class="popup__footer">
        {{ isDisabled }}
        <div class="popup__total-price"><span>Итого: </span>$ {{ totalPrice }}</div>
        <div class="popup__buttons">
          <custom-button 
            class="popup__btn-order popup__btn" 
            @click="addToOrderList" 
            :title="checkoutOrder"
            :disabled="!isDisabled || $v.form.name.$error || $v.form.adress.$error || $v.form.phone.$error"
            :class="{'active-order-btn':isDisabled===true && !$v.form.name.$error && !$v.form.adress.$error && !$v.form.phone.$error}"
          />
          <custom-button 
            class="popup__btn-close popup__btn" 
            @click="closeModaltoClick" 
            :title="closePopUp"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>

import { validationMixin } from 'vuelidate'
import {required, minLength, maxLength, email, } from 'vuelidate/lib/validators'
import CustomInput from '@/components/form/CustomInput'
import CustomButton from '@/components/form/CustomButton'
import { mapGetters } from 'vuex'


export default {
  name: 'CheckoutOrderPopUp',
  mixins: [validationMixin],

  components: { 
    CustomInput, 
    CustomButton 
  },
   
  data() {
    return {
      form: {
        name: '',
        adress: '',
        phone: '',
        email: '',
      },
      checkoutOrder: 'Оформить заказ',
      closePopUp: 'Закрыть',
      placeholderName: 'Введите имя',
      placeholderAdress: 'Введите адрес',
      placeholderTel: 'Телефон',
      placeholderMail: 'email',
      numberOrder: this.$store.state.numberOrder
    }
  },

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2)
      },
      adress: {required},
      phone: {
        required,
        // number,
        minLength: minLength(9),
        maxLength: maxLength(9),
      },
      email: {email},
    },
  },

  computed: {
    ...mapGetters(['cart', 'totalPrice']),

    isDisabled() {
      if(this.form.name && this.form.adress && this.form.phone) {
        this.$store.dispatch('disableButton', true)
      } else {
        this.$store.dispatch('disableButton', false)
      }
      return this.$store.state.disabled 
    },
  },

  methods: {
    closeModaltoClick() {
      this.$emit('closeModaltoClick')
    },

    addToOrderList() {
      const objOrder = {
        numberOrder: this.$store.state.numberOrder,
        name: this.form.name,
        adress: this.form.adress,
        phone: this.form.phone,
        email: this.form.email,
        products: this.$store.getters.cart
      }
      this.$store.dispatch('addToOrderList', objOrder)
      this.$store.dispatch('getOrderNumber')
      this. closeModaltoClick()
      alert('Заказ успешно оформлен, ожидайте Вам перезвонит менеджер нашего магазина')
    },

    deleteProduct(id) {
      this.$store.dispatch('deleteProductFromCart', id)
    },
  }
}
</script>
  
<style lang="scss" scoped>
.is-invalid {
  box-shadow: 0px 0px 3px red;
  color: red;
}
.popup-wrapper {
  background: rgba(31, 46, 30, 0.336);
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  padding: 50px;  
  margin-top: -20px;
}
  .popup {
    z-index: 100;
    width: 500px;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 10px #c9c9c9;
    transition: 0.3 ease;
          
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      background-image: linear-gradient(90deg, #008026, #005212);
      color: #fff;
      border-radius: 6px 6px 0px 0px;
    }

    &__content {
      padding: 10px 40px 0px 40px;
      text-align: left;
      // border-bottom: 1px solid #c9c9c9;
    }

    &__text-valid {
      font-size: 15px;
      color: rgb(236, 0, 0)
    }

    &__text-email {
      font-size: 14px;
      color: rgb(179, 179, 179)
    }
    &__inputs-block {
      padding: 6px 0px 20px 0px;
    }

    &__input {
      padding: 4px 0px 0px 4px;
      border: none;
      border-bottom: 1px solid #c9c9c9;
      margin-bottom: 20px;
    }

    &__text-error {
      color: red;
      font-size: 14px;
    }

    &__number-order {
      font-size: 17px;
      font-weight: 600;
      padding-bottom: 10px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    &__order-header {
      display: flex;
      justify-content: space-between;
      padding: 0px 0px 0px 10px;
      font-size: 14px;
      color: rgb(146, 146, 146);
    }

    &__order-price-del {
      display: flex;
      flex: 0 0 33%;
      justify-content: space-between;
      align-items: center;
    }

    &__products {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 20px;
      border-top: 1px solid #c9c9c9;
    }

    &__product-group {
      display: flex;
      flex: 0 0 30%;
      justify-content: space-between;
      align-items: center;
      
    }

    &__product-title {
      // font-size: 16px;
    }

    &__product-price {
      color: green;
      display: flex;
      justify-content: flex-end;
    }

    &__total-price {
      color: green;
      padding: 14px 0px 0px 0px;
      vertical-align: middle;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding: 14px;
    }

    
    &__icon {
      cursor: pointer;
      opacity: 0.8;
    }

    &__icon:hover {
      opacity: 1;
    }

    &__buttons {
      display: flex;
      gap: 10px;
    }

    &__btn {
      
    }

    &__btn-order {
      background: rgb(146, 146, 146);
    }

    &__btn-close {
      background: red;
    }
  }
  .active-order-btn {
    background: rgb(0, 145, 0);
  }

</style>
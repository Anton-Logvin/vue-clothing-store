<template>
  <div class="user container">
    <!-- TODO: Добавить поменять email, password, photo, phone, name -->
    <h2 class="user__title">{{ userName }}</h2>
    <img class="user__avatar" :src="image" alt="">
    <div class="user__redact">
      <b-form-group 
        class="user__name"
        id="input-group-1" 
        label="Ваше имя:" 
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          placeholder="Введите имя"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group 
        class="user__name"
        id="input-group-2" 
        label="Номер телефона:" 
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="phone"
          placeholder="Введите номер телефона"
          required
        >
        </b-form-input>
      </b-form-group>
    </div>
    {{ phoneNum }}
    <br/>  {{ 'тут должна быть загрузка фото' }}
    <user-image @userAva="userAva(userImageSrc)"/>
    <img :src="userImageSrc" alt="No photo"><br/>
    <custom-button class="user__button" @click="updateUser" title="Update user" />
  
  <ToastedMessage />
  </div>
</template>

<script> 

import { getAuth, updateProfile } from "firebase/auth";
import { mapGetters } from 'vuex'
import UserImage from '@/components/UserImage';
import CustomButton from '@/components/form/CustomButton'
import ToastedMessage from '@/components/ToastedMessage';

export default {
  name: 'userPage',

  data() {
    return {
      auth: null,
      currentUser: null,
      name: null,
      phone: null,
      userImageSrc: '',
    }
  },

  components: { 
    CustomButton, 
    UserImage, 
    ToastedMessage 
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user']),


    userName() {
      return this.currentUser?.displayName || '';
    },
    image() {
      return this.currentUser?.photoURL || '';
    },
    phoneNum() {
      return this.currentUser?.phoneNumber || '';
    },
  },

  created() {
    // Hack. Не получает данные без setTimeout
    setTimeout(() => {
      this.auth = getAuth();
      this.currentUser = this.auth.currentUser;
    }, 1000);

    this.$store.dispatch('productsFb/loadProducts')
  },

  methods: {
    ...mapGetters('productsFb', ['getProductsFirestore']),

    updateUser() {
      updateProfile(this.auth.currentUser, {
        displayName: this.name, 
        phoneNumber: this.phone,
        photoURL: "https://news.store.rambler.ru/img/2b31f673def9712dce283c9301eea18e?img-format=auto&img-1-resize=height:355,fit:max&img-2-filter=sharpen"
      }).then(() => {
        // Profile updated!
        // ...
      }).catch(() => {
        // An error occurred
        // ...
      });
      // this.getMarker()
      console.log("products firestore:", this.$store.getters.getProductsFirestore)
      this.$store.dispatch('productsFb/loadProducts')
      this.$store.getters.getProductsFirestore
      console.log('getter productsFb:',this.$store.getters['productsFb/getProductsFirestore'])
      
      this.$toasted.show("Фото не хочет загружаться, модули vuex getters... ")
    },
  }
}

</script>

<style lang="scss" scoped>
  .user {

    &__avatar {
      border-radius: 50%;
      object-fit: cover;
      width: 200px;
      height: 200px;
    }

    &__redact {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }

    &__button {
      background: green;
      margin: 20px;
    }
  }
</style>
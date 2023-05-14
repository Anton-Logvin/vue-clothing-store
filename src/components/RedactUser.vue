<template>
  <div class="user container">
    <!-- TODO: Добавить поменять email, password, photo, phone, name -->

    <h4 class="user__title">Редактирование профиля!!!!!!!</h4>
    
    <div class="user__redact">
      <div class="user__redact-items">
        <p class="user__time-data">Последние изменения: {{ lastRefreshAt }}</p>
        
        <b-form-group 
          class="user__redact-elem"
          id="input-group-1" 
          label="Ваше имя:" 
          label-for="input-1"
        >
          <b-form-input
            id="input-2"
            class="user__input"
            v-model="redactForm.name"
            placeholder="Введите имя"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group 
          class="user__redact-elem"
          id="input-group-1" 
          label="email:" 
          label-for="input-1"
        >
          <b-form-input
            id="input-3"
            type="email"
            class="user__input"
            v-model="redactForm.email"
            placeholder="Введите email"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group 
          class="user__redact-elem"
          id="input-group-2" 
          type="password"
          label="Изменить пароль:" 
          label-for="input-2"
        >
          <div class=" user__redact-password">
            <b-form-input
              id="input-5"
              class="user__input"
            
              v-model="redactForm.newPassword"
              placeholder="Введите новый пароль"
              required
            >
            </b-form-input>
            <b-form-input
              id="input-6"
              class="user__input"
            
              v-model="redactForm.newPasswordRepeat"
              placeholder="Повторите пароль"
              required
            >
            </b-form-input>
          </div>
          <p class="user__time-data">Последние изменение пароля: {{ passwordUpdatedAt }}</p>
        </b-form-group>
      </div>
  
      <user-image 
        class="user__image-load"
        @avatarUrl="avatarUrlOnLoad"
        v-model="redactForm.userImageSrc"
      />
    </div>
        
    <custom-button class="user__button" @click="updateUser" title="Update user" />
  
  <ToastedMessage />
  </div>
</template>

<script> 

// import Vue from "vue";
import { getAuth,  } from "firebase/auth";
// import { doc, setDoc} from "firebase/firestore"; 
import { mapGetters } from 'vuex'
import UserImage from '@/components/UserImage';
import CustomButton from '@/components/form/CustomButton'
import ToastedMessage from '@/components/ToastedMessage';

export default {
  name: 'userPage',

  props: ['passwordUpdatedAt', 'lastRefreshAt'],

  data() {
    return {
      auth: null,
      currentUser: null,
    
      // phone: '+375295069510',
      
      metadataUser: {},
    
      redactForm: {
        name: null,
        email: null,
        newPassword: '',
        newPasswordRepeat: '',
        userImageSrc: '',
      }
    }
  },

  components: { 
    CustomButton, 
    UserImage, 
    ToastedMessage 
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user', 'dataUser']),


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
      this.metadataUser = this.currentUser.metadata
      this.$store.getters['user/usersFirestore']
      this.$store.dispatch('user/setDataUser', this.currentUser.reloadUserInfo)
    }, 1000);
    
    this.$store.dispatch('productsFb/getProducts')
    this.getProductsFirestore
  },

  methods: {
    ...mapGetters('productsFb', ['getProductsFirestore']),

    avatarUrlOnLoad(url) {
      this.redactForm.userImageSrc = url
    },

    updateUser() {
      this.$store.dispatch('user/updateUser', this.redactForm)  
      this.$toasted.show("Изменения профиля сохранены")
    },
  }
}

</script>

<style lang="scss" scoped>
  .user {
    p {
      margin: 0;
    }

    &__title {
      padding: 20px 0px;
    }

    &__header {
      display: flex;
      padding: 20px;
      border-radius: 16px;
      border: solid 1px #d8d8d8;
      box-shadow: 0px 0px 10px rgb(219, 219, 219);
    }

    &__avatar {
      border-radius: 50%;
      box-shadow: 0px 0px 8px rgb(167, 167, 167);
      object-fit: cover;
      width: 220px;
      height: 220px;
    }

    &__time-data {
      font-size: 14px;
      color: gray;
      padding: 2px;
    }

    &__header-discription {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // padding: 0px 0px 30px 0px;
      // background-image: url('../assets/time.svg');
    }

    &__name {
      font-size: 26px;
      text-align: right;
      padding-right: 20px;
    }

    &__created {
      text-align: left;
      // padding: 40px 0px 0px 30px;
      display: flex;
      justify-content: flex-end;
      // border: solid 1px blue;
    }

    &__redact {
      padding: 30px;
      background: #f5f5f54b;
      border-radius: 16px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      border: solid 1px #d8d8d8;
      box-shadow: 0px 0px 10px rgb(219, 219, 219);
      display: flex;
      justify-content: space-between;
    }

    &__redact-items {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // padding: 0px 20px;
    }

    &__redact-elem {
      
    }

    &__redact-password {
      display: flex;
      gap: 10px;
    }

    &__input {
      margin-bottom: 10px;
    }

    &__button {
      background: green;
      margin: 20px;
    }
  }
</style>
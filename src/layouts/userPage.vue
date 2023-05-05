<template>
  <div class="user container">
    <!-- TODO: Добавить поменять email, password, photo, phone, name -->
    <h2 class="user__title">Профиль пользователя</h2>
    <div class="user__header">
      <img class="user__avatar" :src="image" alt="">
      <div class="user__header-discription">
        <p class="user__name">{{ userName }}</p>
        <div class="user__created">
          <img src="../assets/time.svg" width="50px" alt="">
          <div>
            <p class="user__time-data">Профиль создан: {{ fullDate(dataUser.createdAt) }}</p>
            <p class="user__time-data">Последний вход на сайт: {{ fullDate(dataUser.lastLoginAt) }}</p>
          </div>
        </div>
      </div>
    </div>
 
    <redact-user 
      :passwordUpdatedAt="fullDate(dataUser.passwordUpdatedAt)"
      :lastRefreshAt="fullDate(dataUser.lastRefreshAt)"
    />
    <ToastedMessage />
  </div>
</template>

<script> 

import { getAuth, updatePassword } from "firebase/auth";
import { mapGetters } from 'vuex'
import ToastedMessage from '@/components/ToastedMessage';
import RedactUser from '@/components/RedactUser.vue';

export default {
  name: 'userPage',

  data() {
    return {
      auth: null,
      currentUser: null,
      name: null,
      newPassword: '',
      newPasswordRepeat:''
    }
  },

  components: { 
    ToastedMessage,
    RedactUser 
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user', 'dataUser', ]),


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
      console.log(this.currentUser)
      this.$store.dispatch('user/setDataUser', this.currentUser.reloadUserInfo)
    }, 1000);

    // window.scrollTo(0, 0);
  },

  methods: {
    ...mapGetters('productsFb', ['getProductsFirestore']),

    updateUserPassword() {
      const auth = getAuth();
      const user = auth.currentUser;
      // const newPassword = getASecureRandomPassword();
      updatePassword(user, this.newPassword).then(() => {
      // Update successful.
      console.log(this.newPassword)
    }).catch((error) => {
      // An error ocurred
      // ...
      console.log(error)
    });
    },

    fullDate(data) {
      const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
      const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      
      let myDate = new Date(data);
      
      let allDate = myDate.getDate() + " " + months[myDate.getMonth()] + 
        " " + myDate.getFullYear() + ", " + days[myDate.getDay()] + 
        ", " + myDate.toLocaleTimeString();
      return allDate
    }
  }
}

</script>

<style lang="scss" scoped>
  .user {
    max-width: 1000px;
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

    &__input {
      margin-bottom: 10px;
    }

    &__button {
      background: green;
      margin: 20px;
    }
  }
</style>
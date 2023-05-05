<template>
  <div class="container user-page">
    <h3>Регистрация</h3>
    <b-form  v-if="show">
      <b-form-group
        class="user-page__email"
        id="input-group-1"
        label="Email адрес:"
        label-for="input-1"
        description="Мы никогда не будем делиться вашей электронной почтой с кем-либо еще."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Введите email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        class="user-page__password"
        label="Введите пароль" 
        label-for="input-2"
      >
        <b-form-input
          type="password"
          id="input-3"
          v-model="form.password"
          placeholder="Ваш пароль"
          label="Введите пароль" 
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group 
        class="user-page__name"
        id="input-group-3" 
        label="Повторите пароль"
        label-for="input-3"
      >
        <b-form-input
          id="input-2"
          v-model="repeatPassword"
          placeholder="Повторите пароль"
          required
        >
        </b-form-input>
      </b-form-group>
    
      <router-link class="navbar-link" to="/login" >
        Авторизация
      </router-link>  
      <b-button class="user-page__btn" @click="register" type="button" variant="primary">Submit</b-button>
      <b-button class="user-page__btn" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>


<script>

  export default {
    name: 'RegistrationPage',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        repeatPassword: '',
        show: true
      }
    },
    methods: {
      register() {
        console.log(this.form.password, this.repeatPassword)
        if(this.form.password === this.repeatPassword) {
          this.$store.dispatch('user/registerUser', this.form)
        } console.log('xuy')
      },
    },

    created() {
      window.scrollTo(0, 0);
    }
  }
</script>

<style lang="scss" scoped>
  .user-page {
    max-width: 700px;
    padding-top: 20px;

    &__name {
      padding-top: 20px;
    }

    &__btn {
      margin: 10px 5px;
    }
  }
</style>
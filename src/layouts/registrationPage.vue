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
        class="user-page__name"
        id="input-group-2" 
        label="Ваше имя:" 
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Введите имя"
          required
        >
        </b-form-input>
      </b-form-group>

      <b-form-group 
        class="user-page__password"
        label="Ваш пароль:" 
        label-for="input-2"
      >
        <b-form-input
          type="password"
          id="input-3"
          v-model="form.password"
          placeholder="Введите пароль"
          required
        >
        </b-form-input>
      </b-form-group>
    

      <b-button class="user-page__btn" @click="register" type="button" variant="primary">Submit</b-button>
      <b-button class="user-page__btn" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>


<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default {
    name: 'RegistrationPage',
    data() {
      return {
        form: {
          email: '',
          password: '',
          name: '',
        },
        show: true
      }
    },
    methods: {
      register() {
        const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.form.email, this.form.password, this.form.name)
            .then((userCredential) => {
              console.log(userCredential)
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
            });
      },
      onSubmit() {
        const user = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        this.$store.dispatch('user/registerUser', user)
      }
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
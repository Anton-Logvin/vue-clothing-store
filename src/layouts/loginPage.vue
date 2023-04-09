<template>
  <div class="container user-page">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        class="user-page__email"
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        class="user-page__name"
        id="input-group-2" 
        label="Your password:" 
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter password"
          required
        >
        </b-form-input>
      </b-form-group>

      <router-link class="navbar-link" @click="scrollTop" to="/registration" >
        ЗАрегестрироваться
      </router-link>  
      <b-button class="user-page__btn" type="button" variant="primary" @click="signIn">Submit</b-button>
      <b-button class="user-page__btn" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  export default {
    name: 'UserPage',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      signIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.form.email, this.form.password)
          .then((userCredential) => {
            const token = userCredential.user.accessToken
            if(token) {
              this.$store.dispatch('user/setToken', token)
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
          });
      },
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      scrollTop() {
        window.scrollTo(0, 0);
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
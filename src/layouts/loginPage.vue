<template>
  <div class="container user-page">
    <h3>Авторизация</h3>
    <b-form @submit="submitHundler" @reset="onReset" v-if="show">
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
      <router-link class="product-page-link" to="/registration">Не зарегестрированы? </router-link>
      <b-button class="user-page__btn" type="submit" variant="primary">Submit</b-button>
      <b-button class="user-page__btn" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

  export default {
    name: 'loginPage',
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      async submitHundler() {
        if (this.$v.invalid) {
          this.$v.touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password
        }
  
          await this.$store.dispatch('registerUser', formData)
          console.log(formData)
          this.$router.push('/')
   
        
      },

      onSubmit() {
        // event.preventDefault()
        // alert(JSON.stringify(this.form))

        // if(this.$fers.form.validate()) {
        //   const user = {
        //     email: this.email,
        //     name: this.name,
        //     password: this.password
        //   }
          
        //   this.$store.dispatch('registerUser', user)
        // }
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
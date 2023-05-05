<template>
<div class="header">
  <b-navbar type="dark" variant="dark" class="navbar">
    <div class="container-lg">

      <b-navbar-nav>
        <a href="https://vuejs.org/" class="navbar-logo">
          <img class="navbar-logo-image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="">
          <span> Vue.js</span>
        </a>
        <b-nav-item>
          <router-link class="navbar-link" to="/">Главная</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="navbar-link" to="/catalog">Каталог</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="navbar-link" to="/user">
            <div v-if="isAuth" class="navbar-link">
              <span class="navbar-link-name">
                {{ userName }}
              </span> 
              <img v-if="image" class="navbar-image" :src="image" alt="">
              <b-icon v-if="!image" class="navbar-icon autorisation-icon" icon="person-square" aria-hidden="true"></b-icon>
            </div> 
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <div class="navbar-cart">
        <router-link class="navbar-link" to="/cart">
          <span class="navbar-link-name">Корзина</span> 
          <b-icon class="navbar-icon" icon="cart4" aria-hidden="true"></b-icon>
          {{ cartLength }}
        </router-link>
        <div v-if="isAuth" class="navbar-link" @click="signOut">
          <span class="navbar-link-name">Выход</span> 
          <b-icon class="navbar-icon autorisation-icon" icon="arrow-right" aria-hidden="true"></b-icon>
        </div>  
        <router-link v-else class="navbar-link" to="/login">
          <span class="navbar-link-name">Авторизация</span> 
          <b-icon class="navbar-icon autorisation-icon" icon="person-square" aria-hidden="true"></b-icon>
        </router-link>  
      </div>
    </div>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAuth, } from "firebase/auth";

export default {
  name: 'NavBar',

  data() {
    return {
      currentUser: null,
    }
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user']),
    ...mapGetters('cartModule', ['cart', 'cartLength']),

    userName() {
      return this.currentUser?.displayName || 'Профиль:';
    },

    image() {
      return this.currentUser?.photoURL;
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch('user/signOut')
      this.$router.push('/')
    },

  },

  created () {
    // this.$store.getters.cartLength,
    console.log(this.isAuth)
    this.isAuth
    setTimeout(() => {
      this.auth = getAuth();
      this.currentUser = this.auth.currentUser;
    }, 1000);
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.navbar-link {
  text-decoration: none;
  color: #adadad;
  transition: all .3s ease-out;
}
.navbar-link:hover {
  color: rgba(255, 255, 255, 0.849);
}
.navbar-link-name{
  padding-right: 4px;
}
.navbar {
  font-size: 18px;
  background-image: linear-gradient(90deg, #001f31, #005212);
}

.navbar-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* border: 1px solid rgb(224, 224, 224); */
  object-fit: cover;
}
.navbar-logo {
  display: flex;
  align-items: center;
  padding: 5px;
  text-decoration: none;
  color: rgba(240, 248, 255, 0.692);
  transition: all .3s ease-out;
  filter: drop-shadow(0px 0px 2px #fff);
}
.navbar-logo span {
  padding-right: 8px;
}
.navbar-logo:hover {
  opacity: 0.6;
}
.navbar-logo-image {
  width: 30px;
  height: 30px;
}

.navbar-cart {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media(max-width: 560px) {
  .navbar-link-name{
    display: none;
  }

  .navbar-icon{
    width: 24px;
    height: auto;
  }

  .autorisation-icon {
    padding-top: 2px;
  }
}
</style>

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
        <!-- Navbar dropdowns -->
      
      </b-navbar-nav>


      <div class="navbar-cart">
        <router-link class="navbar-link" to="/cart">
          <span class="navbar-link-name">Корзина</span> 
          <b-icon class="navbar-icon" icon="cart4" aria-hidden="true"></b-icon>
          {{ cartLength }}
        </router-link>
        <div v-if="isAuth" class="navbar-link" @click="signOut">
          <span class="navbar-link-name">Выход</span> 
          <b-icon class="navbar-icon autorisation-icon" icon="person-square" aria-hidden="true"></b-icon>
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
import { getAuth, signOut } from "firebase/auth";

export default {
  computed: {
    ...mapGetters('user', ['isAuth']),
    ...mapGetters(['cart', 'cartLength']),
  },

  methods: {
    signOut() {
      const auth = getAuth();
        signOut(auth).then(() => {
          localStorage.removeItem('token')
          this.$store.dispatch('user/setToken', null)
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        });
    }
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

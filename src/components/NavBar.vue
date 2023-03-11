<template>
<div class="header">
  <b-navbar type="dark" variant="dark" class="navbar">
    <div class="container-lg">
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="product-page-link" to="/">Главная</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="product-page-link" to="/catalog">Каталог</router-link>
        </b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Пользователь" right>
          <b-dropdown-item href="#">
            <router-link class="product-page-link" to="/user">Аккаунт</router-link>  
          </b-dropdown-item>
          <b-dropdown-item href="#">Установки</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <div class="search-products">
        <custom-input 
          class="search-input"
          v-model="search"
          :value="search"
          :plaseHolder="placeHolder"
          width="160"
        />
        <button class="search-btn">
          <b-icon 
            class="search-icon" 
            icon="search"
            font-scale="1.4"
            @click="searchByNameProduct"
        ></b-icon>
        </button>
        <button class="search-btn">
          <b-icon 
            class="search-icon" 
            icon="x-circle"
            font-scale="1.4"
            @click="clearSearch"
        ></b-icon>
        </button>
      </div>
      
      <div class="navbar-cart">
        <router-link class="product-page-link" to="/cart">
          Корзина
          <b-icon icon="cart4" aria-hidden="true"></b-icon>
          {{ cartLength }}
        </router-link>

        <a href="https://vuejs.org/" class="navbar-logo">
          <span> Vue.js</span>
          <img class="navbar-logo-image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="">
        </a>
      </div>

    </div>
  </b-navbar>
</div>
</template>

<script>

import { mapGetters } from 'vuex';
import CustomInput from './form/CustomInput.vue';

export default {
  data() {
    return {
      search: '',
      placeHolder: 'Поиск'
    }
  },

  components: { CustomInput },
  computed: {
    ...mapGetters(['cart', 'cartLength']),
  },

  methods: {
    searchByNameProduct() {
      this.$store.dispatch('searchByNameProduct', this.search)
    },

    clearSearch() {
      this.search = ''
      this.searchByNameProduct()
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
.product-page-link {
  text-decoration: none;
  color: #adadad;
  transition: all .3s ease-out;
}
.product-page-link:hover {
  color: rgba(255, 255, 255, 0.849);
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

.search-products {
  display: flex;
  /* align-items: center; */
  gap: 8px;
}

.search-input {
  height: 30px;
  padding: 6px;
  border-radius: 14px;
  background: rgb(255, 255, 255);
  border: none;
}

.search-btn {
  background: #00521200;
  border: none;
}
.search-icon {
  cursor: pointer;
  color: #fff;
  /* padding: 3px; */
  opacity: 0.7;
  transition: .3s ease;
}

.search-icon:hover {
  opacity: 1;
}
.navbar-cart {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>

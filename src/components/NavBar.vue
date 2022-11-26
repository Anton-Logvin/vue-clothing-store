<template>
 <div>
   <b-navbar type="dark" variant="dark" class="sticky-top">
    <div class="container-lg">
    <b-navbar-nav >
      <b-nav-item>
        <router-link class="product-page-link" to="/">Product Main Page</router-link>
      </b-nav-item>
      <!-- Navbar dropdowns -->
      <b-nav-item href="#">
        <router-link class="product-page-link" to="/cart" >CART</router-link>
      </b-nav-item>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <a href="https://vuejs.org/" class="navbar-logo">
      <span> Vue.js</span>
      <img class="navbar-logo-image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="">
    </a>
    </div>
  </b-navbar>
  </div>

</template>

<style scoped>
.product-page-link {
  text-decoration: none;
  color: #adadad;
  transition: all .3s ease-out;
}
.product-page-link:hover {
  color: rgba(255, 255, 255, 0.849);
}
.sticky-top {
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
</style>
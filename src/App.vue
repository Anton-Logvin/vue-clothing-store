<template>
  <div id="app">
    <NavBar/>
    <h1 class="title">Branded Clothing Store VUE JS</h1>
    <router-view/>
    <div class="title-container">
    <div class="bacground-v"></div>
    
    <!-- <img class="header-title-image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt=""> -->
    
      <SaidBar/>
      <div class="items-product container">
      <ProductCart
        v-for="product in products"
        :key="product.id"
        :product="product"  
      />
        
      </div>
    </div>
  </div>
</template>

<script>

import ProductCart from '@/components/widgets/product/ProductCart'
import NavBar from './components/NavBar'
import SaidBar from './components/SaidBar'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'App',
  components: {
    NavBar,
    ProductCart,
    SaidBar
  },
  data() {
    return {
      products: [
        {
          id: 1,
          title: "Vue Mastery Socks",
          selectedProduct: 0,
          availability: true,
          shipping: "Free",
          isSale: true,
          colors: ["#00ff00", "#4169E1"],
          images: ["/images/vmSocks-green-onWhite.jpg", "/images/vmSocks-blue-onWhite.jpg"]
        },
        {
          id: 2,
          title: "Vue T-shirt",
          selectedProduct: 0,
          availability: false,
          shipping: "Free",
          isSale: false,
          colors: ["#000000", "#00ff00"],
          images: ["/images/vue-t-shirt-black.jpeg", "/images/vue-t-shirt-green.jpeg"]
        },
        {
          id: 3,
          title: "Vue Cap",
          selectedProduct: 0,
          availability: false,
          shipping: "Free",
          isSale: false,
          colors: ["#B22222", "#8B4513"],
          images: ["/images/cap-red.jpg", "/images/cap-brown.jpg"]
        },
        {
          id: 4,
          title: "Vue T-shirt",
          selectedProduct: 0,
          availability: false,
          shipping: "Free",
          isSale: false,
          colors: ["#FFFF00", "#FFF"],
          images: ["/images/t-shirt-yellow.jpg", "/images/t-shirt-white.jpg"]
        },
        {
          id: 5,
          title: "Vue Mastery Socks",
          selectedProduct: 0,
          availability: true,
          shipping: "Free",
          isSale: true,
          colors: ["#4169E1", "#00ff00"],
          images: ["/images/vmSocks-blue-onWhite.jpg","/images/vmSocks-green-onWhite.jpg"]
        },
        {
          id: 6,
          title: "Vue Cap",
          selectedProduct: 0,
          availability: false,
          shipping: "Free",
          isSale: false,
          colors: ["#8B4513", "#B22222"],
          images: ["/images/cap-brown.jpg", "/images/cap-red.jpg"]
        },
      ],
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  
}

.title {
  padding: 20px 0px;
  background-image: linear-gradient(90deg, #00158f3f,#00c9117e, #073f0067);
  opacity: 0.9;
  background-color: #2aa5a18c;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 2px rgb(0, 109, 0);
}

.items-product {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.bacground-v {
  opacity: 0.2;
  z-index: -1;
  height: 100%;
  width: 100%;
  position: absolute;
  background: url('https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg') no-repeat top center;
}
.title-container {
  position: relative;
}

</style>

<template>
<div class="main-page">
  <!-- TODO: Вынести в отдельный компонент -->
  <b-carousel 
    class="main-slider" 
    ref="myCarousel" 
    id="carousel-fade" 
    :interval="2000" 
    style="text-shadow: 0px 0px 2px #000" 
    fade indicators img-width="1024" 
    img-height="480"
  >
    <b-carousel-slide class="main-slider-image" caption="First Slide" img-src="/images/vue-t-shirt-green.jpeg"></b-carousel-slide>
    <b-carousel-slide class="main-slider-image" caption="Second Slide" img-src="/images/t-shirt-white.jpg"></b-carousel-slide>
    <b-carousel-slide class="main-slider-image" caption="Third Slide" img-src= "/images/t-shirt-yellow.jpg"></b-carousel-slide>
  </b-carousel>
  <div class="main-page__items">
    <div 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    >
    <router-link class="main-page__item" :to="'/catalog'">
      <div 
        v-for="(image, index) in product.images" 
        :key="index"
        class="main-page__item-image"
      >
        <img :src="image" />
      </div>
      <div class="main-page__item-description">
        <h4 class="main-page__item-title">{{ product.title }}</h4>
        <div class="main-page__item-icons">
          <b-icon icon="arrow-down-square" scale="2" aria-hidden="true"></b-icon>
          <b-icon icon="cart-check" scale="2" aria-hidden="true"></b-icon>
          <b-icon icon="emoji-sunglasses" scale="2" aria-hidden="true"></b-icon>
        </div>
        
        <span class="main-page__item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, accusamus?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, explicabo!</span>
      </div>
    </router-link>
    </div>
  </div>
</div>
</template>

<script>

export default {
  components: {
    
  },
  computed: {
    products() {
      return this.$store.getters['productList']
    },
  },
  // ...
  methods: {

    getProducts() {
      this.$store.dispatch('getProducts')
    }
  },
  
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.main-slider {
  max-width: 80%;
  margin: 0 auto;
}
.main-slider-image{
  max-height: 400px;
}

.main-page {

  &__items {
    max-width: 850px;
    margin: 0 auto;
  }

  &__item {
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    gap: 10px;
    border: 1px solid rgba(163, 163, 163, 0.253);
    box-shadow: 1px 1px 4px rgba(0, 192, 0, 0.329);
    border-radius: 6px;
    margin: 20px;
    padding: 10px 10px;
    
  }

  &__item-image {
    display: flex;
    border-radius: 6px;
    // flex-grow: 1;
    border: 1px solid rgba(216, 216, 216, 0.233);
    box-shadow: 0px 0px 2px rgba(17, 153, 17, 0.171);
  }

  &__item-image img {
    max-width: 200px;
  }

  &__item-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__item-title {
    font-size: 24px;
    color: #008512;
    // text-shadow: 0px 0px 3px #008512;
  }

  &__item-icons {
    color: #008512cc;
    // max-width: 50%;
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  &__item-text {
    color: #636363be;
  }
}  
</style>
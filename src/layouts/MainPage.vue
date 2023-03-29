<template>
<div class="main-page ">
  <div>
    <b-carousel
      class="main-slider" 
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#fff"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide
        class="main-slider-image"
        caption="1 slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="/images/vue-t-shirt-black.jpeg"
      ></b-carousel-slide>

      <b-carousel-slide
        class="main-slider-image"
        caption="2 slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="/images/t-shirt-white.jpg"
      >
      </b-carousel-slide>

      <b-carousel-slide 
        class="main-slider-image"
        caption="3 slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="/images/t-shirt-yellow.jpg"
      >
      </b-carousel-slide>

      <b-carousel-slide 
        class="main-slider-image"
        caption="4 slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        
        img-src="/images/vue-t-shirt-green.jpeg"
      >
      </b-carousel-slide>
    </b-carousel>
  </div>

  <div class="main-page__items">
    <div 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    >
    <router-link class="main-page__item" :to="'/catalog'">
      <div class="main-page__item-images">
        <div 
          v-for="(image, index) in product.images" 
          :key="index"
          class="main-page__item-image"
        >
          <img :src="image" />
        </div>
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
  computed: {
    products() {
      return this.$store.getters['productList']
    },
  },
  // ...
  methods: {

    getProducts() {
      this.$store.dispatch('getProducts')
    },
  },
  
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.main-slider {
  max-width: 1440px;
  margin: 0 auto;
}
.main-slider-image{
  max-height: 500px;
  border-radius: 20px;
}

.main-page {
  &__items {
    max-width: 850px;
    margin: 0 auto;
  }

  &__item {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    border: 1px solid rgba(163, 163, 163, 0.253);
    box-shadow: 1px 1px 4px rgba(126, 126, 126, 0.329);
    border-radius: 16px;
    margin: 20px;
    padding: 10px 10px;
    max-height: 400px;
  }

  &__item-images {
    display: flex;
  }

  &__item-image {
    border-radius: 6px;
  }

  &__item-image img {
    max-width: 200px;
  }

  &__item-description {
    display: flex;
    flex: 0 0 40%;
    flex-direction: column;
    justify-content: space-between;
  }

  &__item-title {
    font-size: 24px;
    color: #008512;
  }

  &__item-icons {
    color: #008512cc;
    // max-width: 50%;
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 30px;
  }

  &__item-text {
    color: #636363be;
  }
}  

@media(max-width: 760px) {
  .main-page {
    &__item {
      // justify-content: flex-start;
    }

    &__item-images {
      display: flex;
      flex-direction: column;
     
    }

    &__item-image img{
      max-width: 120px;
    }

    &__item-description {
      flex: 0 0 80%;
    }
  }
}


@media(max-width: 660px) {
  .main-page {
    &__item-description {
      flex: 0 0 70%;
    }
  }

  .main-slider-image{
    max-height: 400px;
    border-radius: 20px;
  }
}

@media(max-width: 460px) {
  .main-page {
    &__item-icons {
      display: none;
    }

    &__item-description {
      flex: 0 0 60%;
    }
  }
}

</style>
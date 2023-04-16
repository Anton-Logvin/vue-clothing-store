<template>
  <div class="catalog">
    <div class="catalog__header container">
      <h2>Product catalog</h2>
      <div class="catalog__filters">

        <side-bar class="catalog__sidebar"/>

        <custom-select 
          class="catalog__select"
          :options="selectOptions"
          :selected="selected"
          @selectedOption="selectedOption"
        />
        
        <div class="catalog__search-products">
          <custom-input 
            class="search-input"
            v-model="search"
            :placeholder="placeHolder"
            width="auto"
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
      </div>  
    </div>
    <div class="catalog__body">
      <div class="catalog__bacground-v"></div>
      <div v-if="filteredProducts.length" class="catalog__items container">
        <product-card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product" 
          @click.native="goToProduct(product.id)" 
        />
      </div>
    </div>
    
    <router-link 
      v-if="showTopButton"
      class="catalog__btn-to-up" 
      to="/catalog" 
      @click.native="scrollToTop"
    >
      <b-icon 
        class="catalog__to-up-icon" 
        icon="arrow-up"
        font-scale="1.6"
        @click="clearSearch"
      >
      </b-icon>
    </router-link>
    
  </div>
</template>

<script>
import ProductCard from '@/components/widgets/product/ProductCard'
import SideBar from '@/components/SideBar'
import CustomInput from '@/components/form/CustomInput'
import CustomSelect from '@/components/form/CustomSelect'

export default {
  name: 'CatalogPage',
  
  data() {
    return {
      showTopButton: false,
      search: '',
      placeHolder: 'Поиск',
      selectOptions: [
        {name: 'Убывание $', value: '1'},
        {name: 'Возрастание $', value: '2'}
      ],
      selected: 'Сортировать',
      sortVisible: false,
    }
  },
  
  components: { 
    ProductCard, 
    SideBar,
    CustomInput,
    CustomSelect,
  },

  computed: {
    filteredProducts() {
      let filteredProducts = this.$store.getters['filteredProductsList']
      if(this.selected === 'Убывание $') {
        filteredProducts = (filteredProducts.sort((a, b) => a.price - b.price))
      }
      if(this.selected === 'Возрастание $') {
        filteredProducts = (filteredProducts.sort((a, b) => b.price - a.price))
      }
      return filteredProducts
    },
  },

  methods: {
    goToProduct(id) {
      window.scrollTo(0,0);
      this.$router.push({
        name: 'product', 
        params: { id }
      })
    },

    getProducts() {
      this.$store.dispatch('getProducts')
    },

    selectedOption(option) {
      this.selected = option.name
    },

    searchTitleProduct(searchTitle) {
      this.searchTitle = searchTitle
      console.log(this.searchTitle)
    },

    searchByNameProduct() {
      this.$store.dispatch('searchByNameProduct', this.search)
    },

    clearSearch() {
      this.search = ''
      this.searchByNameProduct()
    },

    scrollToTop() {
      window.scrollTo(0,0);
    },
  },

  created() {
    this.getProducts()
    // console.log(this.$store.getters['productsFb/getProductsFirestore'])
    // this.$store.getters['productsFb/getProductsFirestore']
    window.scrollTo(0,0);
    document.addEventListener("scroll", () => {
      this.showTopButton = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300
    })
  }
}

</script>

<style lang="scss" scoped>
.catalog {

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px 34px 0px; 
  }

  &__search-products {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }

  &__body {
    position: relative;
  }

  &__sort {
    
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 18px;
    padding: 23.5px;
    border-radius: 36px;
    border: solid 2px green;
  }

  &__bacground-v {
    opacity: 0.2;
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;
    background: url('https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg') no-repeat top center;
  }

  &__items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
  }

  &__btn-to-up {
    opacity: 0.8;
    text-decoration: none;
    color: rgb(0, 70, 201);
    background: #fff;
    border: 2px solid #818181;
    border-radius: 6px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    // height: 36px;
    width: 44px;
    padding: 6px;
  }

  &__btn-to-up:hover {
    box-shadow: 0px 0px 5px rgb(255, 252, 252);
    opacity: 1;
  }

  &__to-up-icon {
    // height: 40px
  }
}
.search-input {
  width: 340px;
  height: 34px;
  padding: 0px 10px;
  border-radius: 24px;
  border: 1px solid #0ea300;
  transition: .3s ease;
}

.search-input:hover {
  box-shadow: 0px 0px 4px rgb(97, 97, 97);
  background: rgb(242, 252, 241);
}

.search-btn {
  background: #00521200;
  border: none;
}
.search-icon {
  cursor: pointer;
  color: #0ea300;
  /* padding: 3px; */
  opacity: 0.7;
  transition: .2s ease;
}

.search-icon:hover {
  opacity: 1;
  // height: 110%;
  // width: 110%;
  // margin-top: - 12%;
  
}

@media(max-width: 992px) {
  .catalog{
    &__header {
      flex-direction: column;
    }

    &__items {
      grid-template-columns: 1fr 1fr;
    }

    &__filters {
      width: 90%;
    }
  }
  .search-input {
    width: 100%;

}
}

@media(max-width: 768px) {
  .catalog{
    &__items {
      grid-template-columns: 1fr;
     
    }

    &__filters {
      width: 90%;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
      justify-content: flex-start;
      
    }

    &__search-products {
      grid-row: 1/2;
      grid-column: span 2;
    }

    &__select {
      grid-column: 1/2;
      grid-row: 2/2;
    }
    &__sidebar {
      grid-column: 2/2;
      display: flex;
      justify-content: flex-end;
    }
  }

}
</style>
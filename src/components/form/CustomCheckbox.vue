<template>
  <div>
    <p>Категория</p>
    <label>
      <input 
        type="checkbox" 
        v-model="categories" 
        value="t-shirt" 
        @change="changeCategories"
      >
      <span>Майки</span>
    </label>
    <label>
      <input 
        type="checkbox" 
        v-model="categories" 
        value="cap" 
        @change="changeCategories"
      >
      <span>Кепки</span>
    </label>
    <label>
      <input 
        type="checkbox" 
        v-model="categories" 
        value="socks" 
        @change="changeCategories"
      >
      <span>Носки</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox',

  data() {
    return {
      categories: [],
    }
  },
  methods: {
    changeCategories() {
      this.$emit('changeCategories', this.categories)
    }
  }
}
</script>

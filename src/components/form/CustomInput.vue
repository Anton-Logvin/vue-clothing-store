<template>
  <div>
    <input 
      placeholder="search product"
      v-model="searchNameProduct"
      @onInput="searchByTitle"
    >
  <p>{{ searchNameProduct }}</p>
  </div>
</template>


<script>

export default {
  name: 'CustomInput',
  data() {
    return {
      searchNameProduct: ''
    }
  },
  methods: {
    searchByTitle() {
      this.$emit('searchByTitle', this.searchNameProduct)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
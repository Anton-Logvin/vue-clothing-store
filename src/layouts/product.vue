<template>
  <div class="page">
    <h2>Vue Mastery Socks</h2>
    {{ productId }}
  </div>
</template>

<script>

export default {
  name: 'CatalogPage',

  data() {
    return {
      productId: +this.$route.params.id
    }
  }
}
</script>

<style lang="scss">

</style>
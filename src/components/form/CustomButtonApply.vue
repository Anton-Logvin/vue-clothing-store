<!-- <template>
  <button type="button" :disabled="!isDisabled" @click="filterData">Применить</button>
</template>

<script>

export default {
name: 'CustomButtonApply',
  
  computed: {
    isDisabled() {
      return this.$store.state.disabled
    }
  },

  methods: {
    filterData() {
      // ??????????this
      const { category, priceRange, colors } = this
      this.$store.dispatch('filteredProducts', { category, priceRange, colors })
  
    },
  }
}
</script>
  
<style lang="scss" scoped>

</style> -->
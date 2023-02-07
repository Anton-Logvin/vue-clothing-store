<template>
  <div>
    <input
      v-model="search"
      placeholder="search product"
    >
  </div>
</template>

<script>

export default {
  name: 'CustomInput',

  props: {
    value: {
      type: String,
      default: ""
    }
  },

  computed: {
    search: {
      get() {
        return this.value
      },
      set(val) {
        // this.searchByNameProduct(val)
        console.log(val)
        this.$store.dispatch('searchByNameProduct', val)
        this.$emit('input', val)
      }
    },
  },
  methods: {
    searchByNameProduct(val) {
      console.log(val)
      // const debounce = (fn, ms) => {
      //   return function() {
      //     const fnCall = () => {
      //       fn.apply(this. arguments)
      //     }
      //   }
      // }
      //   this.$store.dispatch('searchByNameProduct', val)

      // value = this.search
      // console.log(value)
      // return this.$store.dispatch('searchByNameProduct', value)
    },
  }
}

</script>
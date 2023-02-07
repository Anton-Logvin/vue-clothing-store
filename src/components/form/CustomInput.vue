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
        this.$emit('input', val)
      }
    },
  },
}

</script>
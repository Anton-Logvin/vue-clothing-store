<template>
  <div>
    <input
      v-model="search"
      :placeholder="plaseHolder"
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
    },
    plaseHolder: {
      type: String,
      default: '_'
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
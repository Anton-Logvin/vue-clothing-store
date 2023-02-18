<template>
  <input
    class="custom-input"
    v-model="search"
    :placeholder="plaseHolder"
    :style="`width: ${fill ? '100%': width + 'px'}`"
  >
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
    },

    width: {
      type: [String. Number],
      default: 100
    },

    fill: {
      type: Boolean,
      default: false,
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

<style lang="scss">
.custom-input {
  display: block;
  padding: 8px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  outline: none;
}
</style>
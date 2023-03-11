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
      default: "_"
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
  height: 32px;
  border-radius: 4px;
  outline: none;
  transition: .3 ease;
}

.custom-input:focus {
  box-shadow: 0px 0px 4px rgb(190, 190, 190);
}
</style>
<template>
  <label>
    <input type="checkbox" v-model="selected">
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'CustomCheckbox',

  props: {
    value: {
      type: [Boolean, String],
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  },

  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
}
</script>

<template>
  <label class="checkbox">
    <input class="checkbox-input" type="checkbox" v-model="selected" >
    <span class="checkbox-title" v-if="label">{{ label }}</span>
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

<style lang="scss" scoped>
  .checkbox {
    color: green;
    border: 1px solid blue;
    padding: 0px 10px;
  }

  .checkbox-input {
    border: 1px solid rgb(138, 10, 31);
    padding: 10px;
  }
  .checkbox-title {
    color: red;
    padding: 10px;
  }
</style>

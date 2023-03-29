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
    width: 88%;
    text-align: start;
    color: green;
    border-bottom: 1px solid rgb(226, 226, 226);
    padding: 0px 10px;
    cursor: pointer;
  }

  .checkbox-input {
    padding: 10px;
  }
  .checkbox-title {
    color: rgb(0, 0, 0);
    padding: 10px;
  }
</style>

<template>
  <form class="radio-group">
    <label v-for="(item, index) in items" :key="index">
      <input v-model="selected" type="radio" :value="item" name="group">
      <span>{{ item }}</span>
    </label>
  </form>
</template>

<script>
export default {
  name: "CustomRadioGroup",

  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    items: {
      type: Array,
      default: () => []
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
  }

}
</script>

<style lang="scss">

</style>
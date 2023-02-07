<template>
  <label>
    <input type="checkbox" v-model="selected" @change="changeCategory">
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script>

export default {
  name: 'CustomCheckbox',
  data() {
    return {
      arr: []
    }
  },
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
        //???????
        this.changeCategory()
        this.$store.dispatch('disableButton', this.value)
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    changeCategory() {
      if(this.value) {
        this.arr.push(this.value)
        console.log(this.arr)
      }
    }
  }
}
</script>

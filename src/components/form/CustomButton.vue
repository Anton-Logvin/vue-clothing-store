<template>
  <button 
    type="button" 
    @click="click"
    class="btn"
  >
    {{ title }}
  </button>
</template>

<script>

export default {
name: 'CustomButton',
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
  
<style lang="scss" scoped>
  .btn {
    border-radius: 4px;
    padding: 5px 10px;
    opacity: 0.85;
    transition: 0.6s ease;
    // border: none;
  }
  .btn:hover {
    opacity: 1;
  }
</style>
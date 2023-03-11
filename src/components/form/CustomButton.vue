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
    background: rgb(192, 192, 192);
    color: rgb(255, 255, 255);
    transition: .3 ease;
  }
  .btn:hover {
    opacity: 1;
    box-shadow: 0px 0px 5px rgb(82, 81, 81);
  }
</style>
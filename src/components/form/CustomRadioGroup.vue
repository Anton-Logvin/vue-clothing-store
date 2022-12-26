<template>
  <form class="radio-group">
    <label
      class="radio-group__label" 
      v-for="(item, index) in items" 
      :key="index" 
      :style="`background: ${item}`"
    >
      <input 
        v-model="selected" 
        type="radio" 
        :value="item" 
        name="group"
        @click="selectedPhoto(index)"
      >
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
  },

  methods: {
  selectedPhoto(index) {
    const indexPhoto = this.items.findIndex(i => i == this.items[index])
    this.$emit('getIndexPhoto', indexPhoto)
  }
}
}
</script>

<style lang="scss">
.radio-group {
  display: flex;
  gap: 10px;
  &__label {
    border-radius: 4px;
    width: 50px;
    height: 15px;
    border: 1px solid gray;
    box-shadow: 0px 0px 5px rgb(204, 204, 204);
    display: flex;
    transition: all .3s ease-out;;
  }
  &__label:hover {
    box-shadow: 0px 0px 5px rgb(99, 99, 99);
  }
}
</style>
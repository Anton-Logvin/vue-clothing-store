<template>
  <div>
    <div class="color">
      <label 
        v-for="(color, i) in getColorsProducts" 
        :key="i"
        class="color__item"
      >
        <input 
          class="color__checkbox" 
          type="checkbox"
          v-model="selectedColors"
          :value="color"
        >
        <span class="color__trigger"
          :style="{ background: color }"
        />
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CustomColorsFilter',

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    selectedColors: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    
    getColorsProducts() {
      return this.$store.getters['allProductColors']
    }
  },
}


</script>

<style lang="scss" scoped>
.color {
  max-width: 250px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  &__item {
    cursor: pointer;
    display: block;
  }
  
  &__trigger {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px rgb(73, 73, 73);
    border: 2px solid transparent;
  }

  &__checkbox {
    display: none;
    
    &:checked {
      & + .color__trigger{
        border-color: #cb11ab;
      }
    }
  }
}
</style>
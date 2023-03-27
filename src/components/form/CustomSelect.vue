<template>
  <div 
    class="select"
    @click="areOptionsVisible = !areOptionsVisible"
  >
    <p class="select__main">{{ selected }}</p>
    <div 
      class="select__options"
      v-if="areOptionsVisible"  
    >
      <p
        class="select__option"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)" 
        >
        {{ option.name }}
      </p>
    </div>
    <b-icon 
      class="select__icon"
      v-if="areOptionsVisible"  
      icon="sort-down-alt"
      font-scale="1.6"
    ></b-icon>
    <b-icon 
      class="select__icon"
      v-if="!areOptionsVisible" 
      icon="sort-up-alt"
      font-scale="1.6"
    ></b-icon>
  </div>
</template>

<script>

  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      selected: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        areOptionsVisible: false,
        sortVisibleIcon: 0
      }
    },

    methods: {
      selectOption(option) {
        this.$emit('selectedOption', option)
       
        this.areOptionsVisible = false
      },

      hideSelect() {
        this.areOptionsVisible = false
      }
    },

    // mounted() {
    //   document.addEventListener('click', this.hideSelect.bind(this), true)
    // },
    // beforeDestroy() {
    //   document.removeEventListener('click', this.hideSelect)
    // },
  }

</script>

<style lang="scss" scoped>
  .select p{
    margin: 0;
  }

  .select:hover {
    background: rgba(0, 128, 0, 0.685);
    color: rgb(255, 255, 255);
    box-shadow: 0px 0px 6px rgb(97, 97, 97);;
  }

  .select {
    position: relative;
    // width: 200px;
    cursor: pointer;
    width: 168px;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 14px;
    color:rgb(0, 151, 0);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.637);
    border: 2px solid rgb(0, 151, 0);
    box-shadow: 0px 0px 2px rgb(196, 196, 196);
    transition: .3s ease;
    
    &__title {
      
    }

    &__main {
      
    }

    &__options {
      position: absolute;
      top: 34px;
      left: 10px;
      font-size: 15px;
      background: #f3fdf1;
      width: 85%;
      color: #4b4b4b;
    }

    &__option {
      border-bottom: 1px solid rgba(0, 151, 0, 0.678);
    }

    &__option:hover {
      background: rgb(235, 235, 235);
    }

    &__icon {

    }
  }
</style>
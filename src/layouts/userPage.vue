<template>
  <div class="user container">user page
    <h2 class="user__title">User</h2>
      {{ image }}
    <img src="image" alt="">

    <custom-input 
      type="file"  
      width="300px"
      :v-model="image"
    />
    <custom-button 
      @click="addPhoto"
    />
  </div>
</template>

<script> 
import CustomInput from '@/components/form/CustomInput.vue'
import CustomButton from '@/components/form/CustomButton.vue'


export default {
  components: { CustomInput, CustomButton },
  name: 'userPage',

  data() {
    return {
      image: '',
    }
  },

  methods: {
    addPhoto() {
      // const reader = new FileReader()
      // reader.onload = () => {
      //   let photo = {
      //     id: Date.now(),
      //     image: this.image,
      //     url: reader.result
      //   }
      //   console.log(photo)
      // }
      // reader.readAsDataURL(this.image)
    console.log(this.image)
    }
  }
}

</script>
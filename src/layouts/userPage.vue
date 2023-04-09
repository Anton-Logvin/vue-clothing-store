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
    <!-- {{ this.$store.state.user }} -->
  <p>-------------------------------------------</p>
    {{ this.$store.state.productsFirestore }}
  </div>
</template>

<script> 

import CustomInput from '@/components/form/CustomInput.vue'
import CustomButton from '@/components/form/CustomButton.vue'
import { mapGetters } from 'vuex'


export default {
  components: { CustomInput, CustomButton },
  name: 'userPage',

  data() {
    return {
      image: '',
    }
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user']),
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

      
      console.log(this.$store.getters['user/user'])
      console.log(this.$store.getters['user/isAuth'])
        // console.log(userCredential.user)
    }
  }
}

</script>
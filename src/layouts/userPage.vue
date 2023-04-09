<template>
  <div class="user container">
    <!-- TODO: Добавить поменять email, password, photo, phone, name -->
    <h2 class="user__title">{{ userName }}</h2>
    <img :src="image" alt="">
    <custom-input 
      type="file"  
      width="300px"
      :v-model="image"
    />
    <custom-button @click="updateUser" title="Update user" />
    <!-- {{ this.$store.state.user }} -->
    <!-- {{ this.$store.state.productsFirestore }} -->
  </div>
</template>

<script> 
import { getAuth, updateProfile } from "firebase/auth";
import CustomInput from '@/components/form/CustomInput.vue'
import CustomButton from '@/components/form/CustomButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: { CustomInput, CustomButton },
  name: 'userPage',

  data() {
    return {
      auth: null,
      currentUser: null
    }
  },

  computed: {
    ...mapGetters('user', ['isAuth', 'user']),
    userName() {
      return this.currentUser?.displayName || '';
    },
    image() {
      return this.currentUser?.photoURL || '';
    }
  },

  created() {
    // Hack. Не получает данные без setTimeout
    setTimeout(() => {
      this.auth = getAuth();
      this.currentUser = this.auth.currentUser;
    }, 1000);
  },

  methods: {
    updateUser() {
      updateProfile(this.auth.currentUser, {
        displayName: "Вин Дизель", 
        photoURL: "https://news.store.rambler.ru/img/2b31f673def9712dce283c9301eea18e?img-format=auto&img-1-resize=height:355,fit:max&img-2-filter=sharpen"
      }).then(() => {
        // Profile updated!
        // ...
      }).catch(() => {
        // An error occurred
        // ...
      });
    },
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
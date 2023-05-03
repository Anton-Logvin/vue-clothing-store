<template id="image-input-template">
  <div class="Image-input">
    <div class="Image-input__image-wrapper">
      <img class="Image-input__image" :src="imageSrc">
    </div>
    
    <div class="Image-input__input-wrapper">
      Установить фото
      <input 
        @change="loadImage" 
        class="Image-input__input" 
        type="file"
        accept="image/png, image/jpeg, image/jpg"
      >
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      image: null,
      imageSrc: '',
      url: ''
    }
  },
  props: [ 'imageUserSrc' ],

  methods: {
    loadImage(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
      console.log(this.image)

      const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };

      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.log(error)
        }, 
        getDownloadURL(storageRef)
          .then((url) => {
            // Insert url into an <img> tag to "download"
            this.url = url
            this.$emit('avatarUrl', this.url)
          })
          .catch((error) => {
            console.log(error)
          })
        );
      },
  }
}
</script>

<style lang="scss" scoped>
.Image-input {
  /* display: flex; */
  // max-width: 500px;
  height: 345px;
  box-shadow: 0px 0px 10px rgb(167, 167, 167);
  border: solid 1px #6398fc;
  border-radius: 6px;

  &__image-wrapper {
    flex-basis: 40%;
    height: 300px;
    border-radius: 6px 6px 0px 0px;
    overflow-y: hidden;
    background: rgba(236, 236, 236, 0.432);
    background-image: url('../assets/iconForPhoto.svg');
    justify-content: center;
    align-items: center;
    display: flex;
  }

  /* .Image-input__image-wrapper > .icon {
    color: #ccc;
    font-size: 50px;
    cursor: default;
  } */

  &__image {
    width: 300px;
    border-radius: 4px;
  }

  &__input-wrapper {
    padding: 10px 9px;
    overflow: hidden;
    position: relative;
    background: #6398fc;
    border-radius: 1px;
    border-radius: 0px 0px 6px 6px;
    color: rgb(255, 255, 255);
    transition: 0.4s background;
  }

  &__input-wrapper:hover {
    background: #1c50b1;
  }

  &__input {
    display: block;
    width: 300px;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    text-align: right;
    top: 0;
    cursor: pointer;
  }
}
</style>
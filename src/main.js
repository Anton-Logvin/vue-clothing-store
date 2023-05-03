import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import './plugins/axios'
import store from './store'
import router from '@/router'
import vClickOutside from 'v-click-outside'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

import { getStorage } from "firebase/storage";
import 'firebase/database'

// import { collection } from 'firebase/firestore'
// import { doc, setDoc } from "firebase/firestore"; 

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  duration: 2000,
  type: 'info',
  position: 'top-right', // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  theme: 'bubble', // ['toasted-primary', 'outline', 'bubble']
  iconPack: 'mdi', // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
})

Vue.use(BootstrapVueIcons)
Vue.use(vClickOutside)

const firebaseConfig = {
  apiKey: "AIzaSyCZsxRq0oPY_9m9e39TDGGm6O4PuTWjKEw",
  authDomain: "vue-clothing-store.firebaseapp.com",
  projectId: "vue-clothing-store",
  storageBucket: "vue-clothing-store.appspot.com",
  messagingSenderId: "718963116738",
  appId: "1:718963116738:web:c6ff053388f67a24fc895b",
  measurementId: "G-ZEKLKCPWFW"
};

const app = initializeApp(firebaseConfig);
getAuth(app);
//firestore
const db = getFirestore(app);
Vue.$db = db
const storage = getStorage(app);
Vue.$storage = storage

new Vue({
  router,
  store,
  created() {
    // this.$store.dispatch('loadProducts')
  },
  render: h => h(App),
}).$mount('#app')
      






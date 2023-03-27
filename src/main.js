// import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVueIcons)
import './plugins/axios'
import store from './store'
import router from '@/router'

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Vue.config.productionTip = false

// const firebaseConfig = {
//   apiKey: "AIzaSyCZsxRq0oPY_9m9e39TDGGm6O4PuTWjKEw",
//   authDomain: "vue-clothing-store.firebaseapp.com",
//   projectId: "vue-clothing-store",
//   storageBucket: "vue-clothing-store.appspot.com",
//   messagingSenderId: "718963116738",
//   appId: "1:718963116738:web:c6ff053388f67a24fc895b",
//   measurementId: "G-ZEKLKCPWFW"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = 
// getAnalytics(app);
// console.log(analytics)


// firebase.auth().onAuthStateChanged(() => {
  new Vue({
      router,
      store,
      render: h => h(App),
      }).$mount('#app')
    // })





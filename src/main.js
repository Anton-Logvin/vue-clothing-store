import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVueIcons)
import './plugins/axios'
import store from './store'
import router from '@/router'
//??????debounce
import { debounce } from 'vue-debounce'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  store,
  //??????debounce
  debounce,
  render: h => h(App),
}).$mount('#app')

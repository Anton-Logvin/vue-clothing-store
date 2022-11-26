import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductMainPage from './components/ProductMainPage'

Vue.use(VueRouter)


const routes = [
    {
      path: '/',
      component: ProductMainPage
    },
    {
      path: '/cart',
      component: () => import('./components/vCart')
    }
  ]


export default new VueRouter({
  mode: 'history',
  routes
})